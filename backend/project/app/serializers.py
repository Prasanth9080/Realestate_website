# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username_or_email = data.get("username_or_email")
        password = data.get("password")

        try:
            user = User.objects.get(email=username_or_email)
        except User.DoesNotExist:
            user = None
        
        if user is None:
            try:
                user = User.objects.get(username=username_or_email)
            except User.DoesNotExist:
                user = None

        if user and user.check_password(password):
            return user
        
        raise serializers.ValidationError("Invalid login credentials.")



#### Razorpay

from rest_framework import serializers
from .models import Transaction


class RazorpayOrderSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()


class TranscationModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ["payment_id", "order_id", "signature", "amount","currency", "status","created_at","customer_address", "user"]


# Home page filter function

from rest_framework import serializers
from .models import RealEstateProperty

class RealEstatePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = RealEstateProperty
        fields = '__all__'  # You can specify the fields you need here


# Home page home property

from rest_framework import serializers
from .models import HomeProperty

class HomePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeProperty
        fields = ['id', 'title', 'description', 'price', 'location', 'image']


        
# Contact

from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']