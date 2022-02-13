from django.contrib import admin
from .models import Product,ProductReview,ProductTag

admin.site.register(Product)
admin.site.register(ProductReview)
admin.site.register(ProductTag)