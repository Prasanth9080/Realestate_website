
######## signup and login 

# accounts/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, LoginSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.contrib.auth import authenticate

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class ResetPasswordView(APIView):
    def post(self, request):
        username = request.data.get('username')
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        # Authenticate user
        user = authenticate(username=username, password=old_password)
        
        if user is not None:
            if new_password == confirm_password:
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'New password and confirm password do not match'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)
    

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

        # reset_url = f"http://localhost:3001/resetpasswordconfirm/{uidb64}/{token}/"
        reset_url = f"http://localhost:3000/resetpasswordconfirm/{uidb64}/{token}/"

        # Send email
        send_mail(
            subject='Password Reset Request',
            message=f'Click the link to reset your password: {reset_url}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )

        return Response({'message': 'Password reset link sent successfully check your email'}, status=status.HTTP_200_OK)


class ResetPasswordConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'message': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            return Response({'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if new_password != confirm_password:
            return Response({'message': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)



# views.py  new
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.razorpay.main import RazorpayClient
from .serializers import RazorpayOrderSerializer, TranscationModelSerializer

rz_client = RazorpayClient()

class RazorpayOrderAPIView(APIView):
    """This API creates a Razorpay order and returns the order ID"""
    
    def post(self, request):
        amount = request.data.get("amount")
        currency = request.data.get("currency")
        
        try:
            razorpay_order = rz_client.create_order(amount=amount, currency=currency)
            response = {
                "status_code": status.HTTP_201_CREATED,
                "order_id": razorpay_order["id"]
            }
            return Response(response, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({'csrfToken': request.META.get('CSRF_COOKIE')})


# views.py
from rest_framework.views import APIView
from rest_framework import status
from .serializers import RazorpayOrderSerializer, TranscationModelSerializer
from app.razorpay.main import RazorpayClient
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated  # Import this to require authentication
from rest_framework.authentication import TokenAuthentication  # Use token authentication if needed

rz_client = RazorpayClient()
class TransactionAPIView(APIView):
    """This API will complete the order and save the transaction with the logged-in user's information"""
    authentication_classes = [TokenAuthentication]  # Use TokenAuthentication for logged-in users
    permission_classes = [IsAuthenticated]  # Require users to be authenticated

    def post(self, request):
        transaction_serializer = TranscationModelSerializer(data=request.data)
        
        if transaction_serializer.is_valid():
            try:
                # Verifying payment signature
                rz_client.verify_payment_signature(
                    razorpay_payment_id=transaction_serializer.validated_data.get("payment_id"),
                    razorpay_order_id=transaction_serializer.validated_data.get("order_id"),
                    razorpay_signature=transaction_serializer.validated_data.get("signature")
                )

                # Save the transaction with the status set to 'complete' and assign the logged-in user
                transaction = transaction_serializer.save(
                    status='complete', 
                    currency=request.data.get("currency"),
                    user=request.user  # Associate the transaction with the current user
                )
                
                response = {
                    "status_code": status.HTTP_201_CREATED,
                    "message": "Transaction completed successfully",
                    "transaction_id": transaction.id,
                    "user": request.user.username  # Optional: return username for confirmation
                }
                return Response(response, status=status.HTTP_201_CREATED)

            except Exception as e:
                response = {
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": str(e)
                }
                return Response(response, status=status.HTTP_400_BAD_REQUEST)

        else:
            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "Bad request",
                "error": transaction_serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class HomePageView(APIView):
    permission_classes = [IsAuthenticated]  # Optional: Use if you want authentication

    def get(self, request):
        return Response({"message": "Welcome to the API!"})
    
    def post(self, request):
        return Response({"message": "POST request received on Homepageview!"}, status=200)

 
from rest_framework import viewsets
from .models import RealEstateProperty
from .serializers import RealEstatePropertySerializer

class RealEstatePropertyViewSet(viewsets.ModelViewSet):
    queryset = RealEstateProperty.objects.all()
    serializer_class = RealEstatePropertySerializer


# home page home property

from rest_framework import viewsets
from .models import HomeProperty
from .serializers import HomePropertySerializer

class HomePropertyViewset(viewsets.ModelViewSet):
    queryset = HomeProperty.objects.all()
    serializer_class = HomePropertySerializer


from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
from .models import Contact  # Import the Contact model

@csrf_exempt  # Disable CSRF check for this view
def contact_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            subject = data.get("subject")
            message = data.get("message")

            # Basic validation (you can add more)
            if not all([name, email, subject, message]):
                return JsonResponse({"error": "All fields are required."}, status=400)

            # Save the contact data to the database
            Contact.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )

            # Sending email to the admin (you can customize the recipient)
            send_mail(
                subject=f"Contact Form Message: {subject}",  # Subject of the email
                message=f"Message from {name} ({email}):\n\n{message}",  # Body of the email
                from_email=email,  # The user's email as the sender
                recipient_list=[settings.DEFAULT_FROM_EMAIL],  # Admin email (configured in settings.py)
            )

            # Send a response back with a success message
            return JsonResponse({"message": "Your message has been sent and saved!"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            # Log the exception to understand it better
            print(f"Error: {str(e)}")  # This will appear in your server logs
            return JsonResponse({"error": "Failed to process the message."}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)


