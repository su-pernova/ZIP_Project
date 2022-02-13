from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ('email', 'username', 'nickname', 'pk', 'date_joined', 'last_login', 'is_admin', 'is_staff')
    search_fields = ('email', 'username','nickname')
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ['is_active']
    fieldsets = ()

admin.site.register(CustomUser, CustomUserAdmin)
