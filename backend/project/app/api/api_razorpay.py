
# ################ working good condition :::::

# from rest_framework.views import APIView
# from rest_framework import status
# from .razorpay_serializers import RazorpayOrderSerializer, TranscationModelSerializer
# from app.api.razorpay.main import RazorpayClient
# from rest_framework.response import Response

# rz_client = RazorpayClient()

# class RazorpayOrderAPIView(APIView):
#     """This API will create an order"""
    
#     def post(self, request):
#         razorpay_order_serializer = RazorpayOrderSerializer(
#             data=request.data
#         )
#         if razorpay_order_serializer.is_valid():
#             order_response = rz_client.create_order(
#                 amount=razorpay_order_serializer.validated_data.get("amount"),
#                 currency=razorpay_order_serializer.validated_data.get("currency")
#             )
#             response = {
#                 "status_code": status.HTTP_201_CREATED,
#                 "message": "order created",
#                 "data": order_response
#             }
#             return Response(response, status=status.HTTP_201_CREATED)
#         else:
#             response = {
#                 "status_code": status.HTTP_400_BAD_REQUEST,
#                 "message": "bad request",
#                 "error": razorpay_order_serializer.errors
#             }
#             return Response(response, status=status.HTTP_400_BAD_REQUEST)


# from rest_framework.views import APIView
# from rest_framework import status
# from .razorpay_serializers import RazorpayOrderSerializer, TranscationModelSerializer
# from app.api.razorpay.main import RazorpayClient
# from rest_framework.response import Response

# rz_client = RazorpayClient()

# class TransactionAPIView(APIView):
#     """This API will complete order and save the transaction"""
    
#     def post(self, request):
#         transaction_serializer = TranscationModelSerializer(data=request.data)
#         if transaction_serializer.is_valid():
#             try:
#                 # Verifying payment signature
#                 rz_client.verify_payment_signature(
#                     razorpay_payment_id=transaction_serializer.validated_data.get("payment_id"),
#                     razorpay_order_id=transaction_serializer.validated_data.get("order_id"),
#                     razorpay_signature=transaction_serializer.validated_data.get("signature")
#                 )

#                 # If verification succeeds, update status to 'complete'
#                 transaction = transaction_serializer.save(status='complete', currency=request.data.get("currency"))
                
#                 response = {
#                     "status_code": status.HTTP_201_CREATED,
#                     "message": "Transaction completed successfully",
#                     "transaction_id": transaction.id
#                 }
#                 return Response(response, status=status.HTTP_201_CREATED)

#             except Exception as e:
#                 response = {
#                     "status_code": status.HTTP_400_BAD_REQUEST,
#                     "message": str(e)
#                 }
#                 return Response(response, status=status.HTTP_400_BAD_REQUEST)

#         else:
#             response = {
#                 "status_code": status.HTTP_400_BAD_REQUEST,
#                 "message": "Bad request",
#                 "error": transaction_serializer.errors
#             }
#             return Response(response, status=status.HTTP_400_BAD_REQUEST)





##############################################################################################################


##### keela ulla function working good condition because login pana username oda
##### admin panel la store agum..



from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from ..models import Razorpay
from .razorpay_serializers import RazorpayOrderSerializer,TranscationModelSerializer
from app.api.razorpay.main import RazorpayClient

# Initialize Razorpay client
rz_client = RazorpayClient()

class RazorpayOrderAPIView(APIView):
    """Create Razorpay order"""
    
    def post(self, request):
        # Extract amount and currency from the request data
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'INR')

        if not amount:
            return Response(
                {
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "message": "Amount is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create order through Razorpay
        try:
            order_response = rz_client.create_order(amount=amount, currency=currency)
            response = {
                "status_code": status.HTTP_201_CREATED,
                "message": "Order created successfully",
                "data": order_response
            }
            return Response(response, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {
                    "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "message": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

import hmac
import hashlib
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from ..models import Razorpay
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class TransactionAPIView(APIView):
    """Complete order and store transaction details"""

    permission_classes = [IsAuthenticated]  # Ensure user is authenticated

    def post(self, request):
        payment_id = request.data.get('payment_id')
        order_id = request.data.get('order_id')
        signature = request.data.get('signature')
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'INR')

        print("Authenticated User:", request.user)  # Log the user
        print("Headers:", request.headers)         # Log headers (for debugging)

        # Ensure user is authenticated
        if request.user.is_anonymous:
            return Response(
                {"status_code": status.HTTP_401_UNAUTHORIZED, "message": "User not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            # Verify payment signature using HMAC-SHA256
            generated_signature = hmac.new(
                key=settings.RAZORPAY_SECRET.encode(),
                msg=f"{order_id}|{payment_id}".encode(),
                digestmod=hashlib.sha256
            ).hexdigest()

            if generated_signature != signature:
                raise ValueError("Razorpay Signature Verification Failed")

            # Save transaction linked to the authenticated user
            transaction = Razorpay.objects.create(
                user=request.user,  # Use the authenticated user
                payment_id=payment_id,
                order_id=order_id,
                signature=signature,
                amount=amount,
                currency=currency,
                status='complete'
            )

            response = {
                "status_code": status.HTTP_201_CREATED,
                "message": "Transaction completed successfully",
                "transaction_id": transaction.id
            }
            return Response(response, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response(
                {"status_code": status.HTTP_400_BAD_REQUEST, "message": f"Payment verification failed: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"status_code": status.HTTP_500_INTERNAL_SERVER_ERROR, "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
