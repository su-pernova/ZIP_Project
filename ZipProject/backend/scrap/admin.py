from django.contrib import admin
from .models import ScrapProduct,ScrapCuration

admin.site.register(ScrapCuration)
admin.site.register(ScrapProduct)