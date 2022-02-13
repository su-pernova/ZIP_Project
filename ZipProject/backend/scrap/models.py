from django.db import models

# Create your models here.
class ScrapProduct(models.Model):
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='scrapproduct') 
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE, related_name='scrapuser')

    created_at = models.DateTimeField(auto_now_add=True)  #스크랩한 시간

    def __str__(self):
        return "{}-{}".format(self.user, self.product)

class ScrapCuration(models.Model):
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='scrapcuration')
    curation = models.ForeignKey('curation.Curation', on_delete=models.CASCADE, related_name='scrapuser')

    created_at = models.DateTimeField(auto_now_add=True) #스크랩한 시간

    def __str__(self):
        return "{}-{}".format(self.user, self.curation)


