from django.db import models

class Product(models.Model):
    article_no = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=300)
    in_price = models.DecimalField(max_digits=12, decimal_places=2)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    unit = models.CharField(max_length=100, blank=True)
    in_stock = models.IntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.article_no} - {self.name}"