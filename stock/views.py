from django.shortcuts import render, redirect
from django.contrib.auth.models import auth
from account.models import User, UpdateUser
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from decimal import Decimal

# Local imports
from .models import History, UpdateUser, Plan, Withdraw, Crypto
from account.models import User

# Create your views here.

def reg_page(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/login.html'
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('stock:dashboard')
        messages.info(request, 'Invalid Credentials.')
        return redirect('core:login')
    return render(request, template_name)

def logout(request):
    """Returns the logout page, redirecting to the home page."""
    auth.logout(request)
    return redirect('stock:login')

@login_required
def dashboard(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/dashboard.html'
    user = request.user
    updates = UpdateUser.objects.get_or_create(user=user)
    histories = History.objects.filter(user=user).order_by('-date')
    context = {'updates': updates, 'histories': histories} 
    return render(request, template_name, context)

@login_required
def transactions(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/transactions.html'
    user = request.user
    histories = History.objects.filter(user=user).order_by('-date')
    context = {'histories': histories}
    return render(request, template_name, context)

@login_required
def kyc(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/kyc.html'
    user = request.user
    updates = UpdateUser.objects.filter(user=user)
    if request.method == 'POST' and request.FILES['passport']:
        passport = request.FILES['passport']
        fs = FileSystemStorage()
        file = fs.save(passport.name, passport)
        file_url = fs.url(file)
        updated = UpdateUser(passport=file,)
        updated.user = request.user
        updated.save()
        messages.info(request, 'Congratulations, Data updated!')
        return redirect('stock:dashboard')
    return render(request, template_name)

@login_required
def updated_kyc(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/updated_kyc.html'
    return render(request, template_name)

def active_plans(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/activeplans.html'
    return render(request, template_name)

def plans(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/plans.html'
    return render(request, template_name)

def wallet(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/wallets.html'
    crypto = Crypto.objects.all()

    context = {'cryptoes': crypto}
    return render(request, template_name, context)

@login_required
def withdraw(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/withdraw.html'
    user = request.user
    available_balance = Decimal(UpdateUser.objects.get(user=user,).available_balance)
    total_withdrawal = Decimal(UpdateUser.objects.get(user=user,).total_withdrawal)
    update_user = UpdateUser.objects.filter(user=user,)
    withdraw = Withdraw.objects.filter(user=user)
    if request.method == 'POST':
        amount = request.POST['amount']
        wallet_address = request.POST['wallet_address']
        new_amount = Decimal(amount)
        if new_amount > available_balance:
            messages.info(request, "Insufficient Wallet Balance! Please fund your Wallet.")
            return redirect('stock:withdraw')
        available_balance -=new_amount
        total_withdrawal +=new_amount
        update_user.update(available_balance=available_balance, total_withdrawal=total_withdrawal)
        withdraw = Withdraw(amount=amount, wallet_address=wallet_address)
        withdraw.user = user
        withdraw.save()
        messages.info(request, 'Pending... Awaiting Approval')
        return redirect('stock:dashboard')
    return render(request, template_name)

def profile(request):
    """Displays the helpful forms page."""
    template_name = 'primecapital/profile.html'
    return render(request, template_name)


