from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Curation(models.Model):
    title = models.CharField(max_length=20) #큐레이션명
    pub_date = models.DateTimeField(default=timezone.now) #생성날짜/시간
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="post_curations",default='') #작성자
    content = models.TextField(default='') #설명
    image = models.ImageField(upload_to='images/',blank=True) #썸네일이미지
    private = models.BooleanField(default=False) #비공개_큐레이션
    share = models.BooleanField(default=False) #공유_큐레이션
    products = models.ManyToManyField('product.Product',blank=True) #큐레이션에 담긴 상품 리스트
    product_user = models.ManyToManyField('users.CustomUser', blank=True) #상품을 추가한 유저 리스트
    tags = models.ManyToManyField('CurationTag',blank=True) #큐레이션 태그
    #scrap_users = models.ManyToManyField('users.CustomUser',blank=True,related_name='scrap_curation') #스크랩한 유저

    def __str__(self):
        return str(self.title)
    
class CurationComment(models.Model) :
    curation = models.ForeignKey('Curation',related_name='curation_comments',on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="comment_user",default='')
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.curation)

class CurationTag(models.Model):
    name = models.CharField(max_length=10, unique=True,blank=True)

    def __str__(self):
        return str(self.name)