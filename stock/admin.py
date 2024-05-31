from django.contrib import admin
from .models import History, UpdateUser, Plan, Withdraw, Crypto

# Register your models here.

class HistoryAdmin(admin.ModelAdmin):
    
    list_display = ('id','user')
    list_display_links = ('id', 'user')
    search_fields = ('user',)
    list_per_page = 25

admin.site.register(History, HistoryAdmin)
admin.site.register(Plan)
admin.site.register(Withdraw)
admin.site.register(Crypto)

class UpdateUserAdmin(admin.ModelAdmin):
    
    list_display = ('id','user', 'currency', 'available_balance')
    list_display_links = ('id', 'user')
    search_fields = ('user',)
    list_per_page = 25

admin.site.register(UpdateUser, UpdateUserAdmin)