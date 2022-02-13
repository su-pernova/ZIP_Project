from django.contrib import admin
from .models import Curation,CurationComment,CurationTag

admin.site.register(Curation)
admin.site.register(CurationComment)
admin.site.register(CurationTag)