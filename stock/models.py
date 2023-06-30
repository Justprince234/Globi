from django.db import models
from account.models import User
import uuid
from datetime import timedelta
from datetime import datetime

# Create your models here.
class Plan(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=50,decimal_places=2) 
    return_on_investment = models.DecimalField(max_digits=50,decimal_places=2)
    referal_bonus = models.DecimalField(max_digits=50,decimal_places=2) 
    date = datetime.now()

    class Meta:
        verbose_name_plural = "Plans"

    def __str__(self):
        return self.name

class Crypto(models.Model):
    wallet_name = models.CharField(max_length=100)
    wallet_address = models.CharField(max_length=100)
    barcode = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True, null=True)

    class Meta:
        verbose_name_plural = "My crypto Wallet addresses"

    def __str__(self):
        return self.wallet_name

class UpdateUser(models.Model):
    """Update user credentials"""
    user = models.OneToOneField(User, related_name='stock_owner', on_delete=models.CASCADE) 
    available_balance = models.DecimalField(default=0, max_digits=50, decimal_places=2)
    total_deposit = models.DecimalField(default=0, max_digits=50, decimal_places=2)
    total_earnings = models.DecimalField(default=0, max_digits=50, decimal_places=2)
    total_withdrawal = models.DecimalField(default=0, max_digits=50, decimal_places=2)
    date_updated = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "User Profile Update"
  
    def __str__(self):
        return "{}".format(self.user)
    
    def new_available_balance(self):
        balance = self.available_balance
        real_balance = "{:,.2f}".format(balance)
        return real_balance
    
    def new_total_withdrawal(self):
        balance = self.total_withdrawal
        real_balance = "{:,.2f}".format(balance)
        return real_balance
    
    def new_total_deposit(self):
        balance = self.total_deposit
        real_balance = "{:,.2f}".format(balance)
        return real_balance
    
    def new_total_earnings(self):
        balance = self.total_earnings
        real_balance = "{:,.2f}".format(balance)
        return real_balance
    
TRANSACTION_TYPE = (
    ('Debit', 'Debit'), 
    ('Credit', 'Credit') 
)

PLAN_TYPE = (
    ('Regular', 'Regular'), 
    ('Standard', 'Standard'),
    ('Premium', 'Premium') 
)

STATUS_TYPE = (
    ('Pending', 'Pending'), 
    ('Approved', 'Approved')
)

class History(models.Model):
    user =  models.ForeignKey(User, related_name='stock_history', on_delete=models.CASCADE) 
    plan = models.CharField(choices=PLAN_TYPE, default="Regular", max_length=10)
    transaction_type = models.CharField(choices=TRANSACTION_TYPE, default="stock_debits", max_length=10)
    amount = models.DecimalField(default=0, max_digits=50, decimal_places=2)
    status = models.CharField(choices=STATUS_TYPE, default="Pending", max_length=10)
    date = models.DateField()

    class Meta:
        verbose_name_plural = "Histories"
    
    def new_amount(self):
        balance = self.amount
        real_balance = "{:,.2f}".format(balance)
        return real_balance

class Withdraw(models.Model):
    user =  models.ForeignKey(User, related_name='withdraw', on_delete=models.CASCADE)
    wallet_address = models.CharField(max_length=100)
    amount = models.DecimalField(default=0, max_digits=50, decimal_places=2)

    class Meta:
        verbose_name_plural = "Client Withdrawal Details"

    def __str__(self):
        return str(self.user)