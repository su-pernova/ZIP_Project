from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from product.models import Product, ProductReview
from curation.models import Curation, CurationComment

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, nickname, first_name, last_name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            nickname=nickname,
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email, username, nickname, password, first_name, last_name):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            nickname=nickname,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractUser):
    # 기본 정보
    email =             models.EmailField(verbose_name='email', max_length=60, unique=True)
    username =          models.CharField(max_length=30, unique=True, primary_key=True)
    nickname =          models.CharField(max_length=30, unique=True)
    date_joined =       models.DateField(verbose_name='date joined', auto_now_add=True)
    last_login =        models.DateField(verbose_name='last login', auto_now=True)
    is_admin =          models.BooleanField(default=False, verbose_name='admin')
    is_active =         models.BooleanField(default=True, verbose_name='active')
    is_staff =          models.BooleanField(default=False, verbose_name='staff')
    is_superuser =      models.BooleanField(default=False, verbose_name='superuser')
    first_name =        models.CharField(verbose_name='first name', max_length=30)
    last_name =         models.CharField(verbose_name='last name', max_length=30)
    description =       models.TextField(default="", blank=True, max_length=150)
    profile_image =     models.ImageField(null=True, blank=True, upload_to='profile/')
    header_image =      models.ImageField(null=True, blank=True, upload_to='header/')

    # 작성 글
    created_curation =  models.ManyToManyField(Curation, related_name='CreatedCustomUser', blank=True)
    created_product =      models.ManyToManyField(Product, related_name='CreatedCustomUser', blank=True)
    # 작성 댓글
    comment_curation =  models.ManyToManyField(CurationComment, related_name='CommentCustomUser', blank=True)
    review_product =    models.ManyToManyField(ProductReview, related_name='ReviewCustomUser', blank=True)
    # 좋아요
    like_curation =  models.ManyToManyField(Curation, related_name='LikeCustomUser', blank=True)
    like_product =      models.ManyToManyField(Product, related_name='LikeCustomUser', blank=True)

    USERNAME_FIELD = 'username' 
#this field means that when you try to sign in the username field will be the email 
#change it to whatever you want django to see as the username when authenticating the user
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name','nickname']

    objects = CustomUserManager()

    def __str__(self):
        return self.username