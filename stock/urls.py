from django.urls import path
from . import views

app_name = 'stock'

urlpatterns = [
    path('login', views.reg_page, name='login'),
    path('logout/', views.logout, name='logout'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('transactions', views.transactions, name='transactions'),
    path('kyc', views.kyc, name='kyc'),
    path('active-plans', views.active_plans, name='active-plans'),
    path('plans', views.plans, name='plans'),
    path('wallet', views.wallet, name='wallet'),
    path('withdraw', views.withdraw, name='withdraw'),
    path('profile', views.profile, name='profile')
]