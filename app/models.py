from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class AutoModel(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User)
    class Meta:
        ordering = ['name']

    def __unicode__(self):
        return '%s' % (self.name)