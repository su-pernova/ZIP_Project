import operator
from rest_framework import viewsets
from rest_framework.response import Response
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from .permissions import IsOwnerOrReadOnly

from .models import Recommender
from product.models import Product
from curation.models import Curation

from .serializers import RecommenderSerializer
from product.serializers import ProductSerializer
from product.serializers import ProductTagSerializer
from curation.serializers import CurationSerializer

class RecommenderViewSet(viewsets.ModelViewSet):
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    # permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Recommender.objects.all()
    serializer_class = RecommenderSerializer
    lookup_field = 'target_user'

    def chosen_tag_list(self,request,username):
        choice = Recommender.objects.all()
        chosen_tags = []
        
        # 이용자의 선택지에서 tag 요소를 모두 추출
        for i in choice:
            if str(i.target_user)==username:
                for product in i.products.all(): # 상품
                    for tag in product.tags.all():
                        chosen_tags.append(tag)
                for tag in i.product_tags.all(): # 상품 태그
                    chosen_tags.append(tag)
                for curations in i.curations.all(): # 큐레이션
                    for tag in curations.tags.all():
                        chosen_tags.append(tag)
                for tag in i.curation_tags.all(): # 큐레이션 태그
                    chosen_tags.append(tag)

        serializer = ProductTagSerializer(chosen_tags,many=True)
        return Response(serializer.data)

    def top_tag_list(self,request,username):
        choice = Recommender.objects.all()
        chosen_tags = []
        for i in choice:
            if str(i.target_user)==username:
                for product in i.products.all():
                    for tag in product.tags.all():
                        chosen_tags.append(tag)
                for tag in i.product_tags.all():
                    chosen_tags.append(tag)
                for curations in i.curations.all():
                    for tag in curations.tags.all():
                        chosen_tags.append(tag)
                for tag in i.curation_tags.all():
                    chosen_tags.append(tag)

        # 각 tag 요소의 개수를 count
        tag_count = {}
        for i in chosen_tags:
            if i.id in tag_count: tag_count[i.id] += 1
            else: tag_count[i.id] = 1
        tag_count = sorted(tag_count.items(),key=operator.itemgetter(0))

        # 가장 많이 선택된 tag-top3 선별, 태그 종류가 2개 이하 : tag-top1 만 선별
        top_tags = []; idx = 0; flag = 0
        if len(tag_count)>2:
            for i in tag_count:
                for j in chosen_tags:
                    if j.id == i[0]:
                        flag = 0
                        for k in top_tags:
                            if k.name == j.name: flag = 1; break
                        if flag == 0:
                            top_tags.append(j)
                            idx += 1
                            if idx == 3: break
                if idx == 3: break
        elif len(tag_count)<2:
            for i in tag_count:
                for j in chosen_tags:
                    if j.id == i[0]: top_tags.append(j)
                break

        serializer = ProductTagSerializer(top_tags,many=True)
        return Response(serializer.data)

    def recommend_product(self,request,username):
        choice = Recommender.objects.all()
        chosen_tags = []
        for i in choice:
            if str(i.target_user)==username:
                for product in i.products.all(): # 상품
                    for tag in product.tags.all():
                        chosen_tags.append(tag)
                for tag in i.product_tags.all(): # 상품 태그
                    chosen_tags.append(tag)
                for curations in i.curations.all(): # 큐레이션
                    for tag in curations.tags.all():
                        chosen_tags.append(tag)
                for tag in i.curation_tags.all(): # 큐레이션 태그
                    chosen_tags.append(tag)

        # 각 tag 요소의 개수를 count
        tag_count = {}
        for i in chosen_tags:
            if i.id in tag_count: tag_count[i.id] += 1
            else: tag_count[i.id] = 1
        tag_count = sorted(tag_count.items(),key=operator.itemgetter(0))

        # 가장 많이 선택된 tag-top3 선별, 태그 종류가 2개 이하 : tag-top1 만 선별
        top_tags = []; idx = 0
        if len(tag_count)>2:
            for i in tag_count:
                for j in chosen_tags:
                    if j.id == i[0]: 
                        if j not in top_tags: top_tags.append(j)
                idx += 1
                if idx == 3: break
        elif len(tag_count)<2:
            for i in tag_count:
                for j in chosen_tags:
                    if j.id == i[0]: top_tags.append(j)
                    break
                break
        
        # top-tags를 포함하는 product 모두 반환
        recommended_products = []
        product_list = Product.objects.all()
        for i in top_tags:
            for p in product_list.iterator():
                for p_tag_name in p.tags.all():
                    if i.name == p_tag_name.name:
                        if p not in recommended_products:
                            recommended_products.append(p)

        serializer = ProductSerializer(recommended_products,many=True)
        return Response(serializer.data)

    def recommend_curation(self,request,username):
        choice = Recommender.objects.all()
        chosen_tags = []
        for i in choice:
            if str(i.target_user)==username:
                for product in i.products.all(): # 상품
                    for tag in product.tags.all():
                        chosen_tags.append(tag)
                for tag in i.product_tags.all(): # 상품 태그
                    chosen_tags.append(tag)
                for curations in i.curations.all(): # 큐레이션
                    for tag in curations.tags.all():
                        chosen_tags.append(tag)
                for tag in i.curation_tags.all(): # 큐레이션 태그
                    chosen_tags.append(tag)

        # 각 tag 요소의 개수를 count
        tag_count = {}
        for i in chosen_tags:
            if i.id in tag_count: tag_count[i.id] += 1
            else: tag_count[i.id] = 1
        tag_count = sorted(tag_count.items(),key=operator.itemgetter(0))

        # 가장 많이 선택된 tag-top3 선별, 태그 종류가 2개 이하 : tag-top1 만 선별
        top_tags = []; idx = 0
        if len(tag_count)>2:
            for i in tag_count:
                for j in chosen_tags:
                    if j.id == i[0]: 
                        if j not in top_tags: top_tags.append(j)
                idx += 1
                if idx == 3: break
        elif len(tag_count)<2:
            for i in tag_count:
                for j in chosen_tags:
                    if j.id == i[0]: top_tags.append(j)
                break
        
        # top-tags를 포함하는 curation 모두 반환
        recommended_curations = []
        curation_list = Curation.objects.all()
        for i in top_tags:
            for c in curation_list.iterator():
                for c_tag_name in c.tags.all():
                    if i.name == c_tag_name.name:
                        if c not in recommended_curations:
                            recommended_curations.append(c)

        serializer = CurationSerializer(recommended_curations,many=True)
        return Response(serializer.data)

target_user_list = RecommenderViewSet.as_view({'get': 'list'})
recommender_list = RecommenderViewSet.as_view({'get': 'retrieve'})

chosen_tag_list = RecommenderViewSet.as_view({'get': 'chosen_tag_list'})
top_tag_list = RecommenderViewSet.as_view({'get': 'top_tag_list'})
recommended_products = RecommenderViewSet.as_view({'get': 'recommend_product'})
recommended_curations = RecommenderViewSet.as_view({'get': 'recommend_curation'})