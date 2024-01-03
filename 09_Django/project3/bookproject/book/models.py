from django.db import models

# Create your models here.

# class SampleModel (models.Model):
#     title = models.CharField(max_length=100)
#     number = models.IntegerField()

CATEGORY = (('buisiness', 'ビジネス'), ('life', '生活'), ('others', 'その他'))

class Book(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    category = models.CharField(
        max_length=100,
        choices = CATEGORY
    )
    
    def __str__(self):
        return self.title