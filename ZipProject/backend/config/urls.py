from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

# for product app
from product.views import ProductViewSet,ProductTagViewSet,ProductReviewViewSet

# for curation app
from curation.views import CurationViewSet,CurationCommentViewSet,CurationTagViewSet

#for recommender app
from recommender.views import RecommenderViewSet

#for scrap app
from scrap.views import ScrapCurationViewSet,ScrapProductViewSet

# for product app
router = routers.DefaultRouter()
router.register('api/product/add',ProductViewSet)
router.register('api/product/review', ProductReviewViewSet)
router.register('api/product/tag',ProductTagViewSet)

# for curation app
router.register('api/curation/add',CurationViewSet)
router.register('api/curation/comment',CurationCommentViewSet)
router.register('api/curation/tag',CurationTagViewSet)

# for recommender app
router.register('api/recommender/add',RecommenderViewSet)

# for scrap app
router.register('api/scrap/product/add',ScrapProductViewSet)
router.register('api/scrap/curation/add',ScrapCurationViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    path('api/users/', include('users.urls')),
    path('api/curation/', include('curation.urls')),
    path('api/product/', include('product.urls')),
    path('api/recommender/', include('recommender.urls')),
    path('api/scrap/',include('scrap.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)