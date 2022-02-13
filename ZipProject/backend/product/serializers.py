from rest_framework import serializers
from .models import Product,ProductTag,ProductReview

class ProductReviewSerializer(serializers.ModelSerializer) :
    class Meta :
        model = ProductReview
        fields ='__all__'

class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields ='__all__'

class ProductSerializer(serializers.ModelSerializer) :
    image = serializers.ImageField(use_url=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    class Meta :
        model = Product
        fields = ('id','title','user','content','online_shop','image','price'
        ,'shop_Type','shop_URL_Location','type','tags','pub_date','reviews')