# Generated by Django 3.2.6 on 2021-11-10 12:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('curation', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='curationcomment',
            name='comment_user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='comment_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
