from django.db import models

from django.contrib.auth.models import User




#### Razorpay:

from django.contrib.auth.models import User
from django.db import models

class Razorpay(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('complete', 'Complete'),
        ('failed', 'Failed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="User", related_name="razorpay_transactions", null=True, blank=True)
    payment_id = models.CharField(max_length=200, verbose_name="Payment ID")
    order_id = models.CharField(max_length=200, verbose_name="Order ID")
    signature = models.CharField(max_length=500, verbose_name="Signature", blank=True, null=True)
    amount = models.IntegerField(verbose_name="Amount")
    currency = models.CharField(max_length=10, verbose_name="Currency", default='INR')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True,)

    # def __str__(self):
    #     return str(self.id)
    
    # def __str__(self):
    #     return f"{self.user.username} - {self.id}"

    def __str__(self):
         return f"{self.user.username if self.user else 'No User'} - {self.id}"