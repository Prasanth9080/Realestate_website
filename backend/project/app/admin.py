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
from .models import Transaction

class TransactionAdmin(admin.ModelAdmin):
   list_display = ('id','user','payment_id', 'order_id', 'signature', 'amount','currency','status','created_at',)

admin.site.register(Transaction, TransactionAdmin)