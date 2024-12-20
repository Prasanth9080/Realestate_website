# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Unregister the default User admin
admin.site.unregister(User)

# Optionally, you can create a custom admin for User if needed
class CustomUserAdmin(UserAdmin):
    model = User
    # Add any additional configuration for the admin interface here

# Register the User model with the custom admin
admin.site.register(User, CustomUserAdmin)


#### Razor pay:

from django.contrib import admin
from .models import Razorpay


class RazorpayAdmin(admin.ModelAdmin):
   list_display = ('id','user','payment_id', 'order_id', 'signature', 'amount','status','created_at', )

admin.site.register(Razorpay, RazorpayAdmin)

from django.contrib import admin
from .models import RealEstateProperty

class RealEstatePropertyAdmin(admin.ModelAdmin):
    list_display = ['id','title', 'price', 'location', 'property_type', 'created_at']
    search_fields = ['title', 'location']
    list_filter = ['property_type', 'created_at']

admin.site.register(RealEstateProperty, RealEstatePropertyAdmin)


from django.contrib import admin
from .models import HomeProperty

class HomePropertyAdmin(admin.ModelAdmin):
    list_display = ['id','title', 'price', 'location']
    search_fields = ['title', 'location']

admin.site.register(HomeProperty, HomePropertyAdmin)


from django.contrib import admin
from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name','email','subject','created_at','message')
    search_fields = ('name','email','subject')

admin.site.register(Contact, ContactAdmin)

