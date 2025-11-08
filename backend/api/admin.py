from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'article_no', 'name', 'price', 'in_stock', 'created_at')
    search_fields = ('article_no', 'name')
