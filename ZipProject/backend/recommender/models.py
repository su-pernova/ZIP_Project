from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.conf import settings

class Recommender(models.Model):
    target_user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="target_user",default='')
    products = models.ManyToManyField('product.Product',blank=True,related_name='rec_products')
    product_tags = models.ManyToManyField('product.ProductTag',blank=True)
    curations = models.ManyToManyField('curation.Curation',blank=True)
    curation_tags = models.ManyToManyField('curation.CurationTag',blank=True)