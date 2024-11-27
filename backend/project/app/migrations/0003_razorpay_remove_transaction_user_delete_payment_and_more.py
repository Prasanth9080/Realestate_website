# Generated by Django 4.2.15 on 2024-11-26 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_payment"),
    ]

    operations = [
        migrations.CreateModel(
            name="Razorpay",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "payment_id",
                    models.CharField(max_length=200, verbose_name="Payment ID"),
                ),
                ("order_id", models.CharField(max_length=200, verbose_name="Order ID")),
                (
                    "signature",
                    models.CharField(
                        blank=True, max_length=500, null=True, verbose_name="Signature"
                    ),
                ),
                ("amount", models.IntegerField(verbose_name="Amount")),
                (
                    "currency",
                    models.CharField(
                        default="INR", max_length=10, verbose_name="Currency"
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("complete", "Complete"),
                            ("failed", "Failed"),
                        ],
                        default="pending",
                        max_length=10,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name="transaction",
            name="user",
        ),
        migrations.DeleteModel(
            name="Payment",
        ),
        migrations.DeleteModel(
            name="Transaction",
        ),
    ]
