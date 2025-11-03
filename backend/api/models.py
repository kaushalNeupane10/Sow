from django.db import models

#login text and terms text
class LocalText(models.Model):
    key = models.CharField(max_length=100)
    language = models.CharField(max_length=2)
    text = models.TextField()

    def __str__(self):
        return f"{self.key} ({self.language})"
    
#price
class PriceItem(models.Model):
    product = models.CharField(max_length=300)
    in_price = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.product
