from django.contrib import admin

from .models import Cat


@admin.register(Cat)
class Cats(admin.ModelAdmin):
    # list_display = ("id", "name", "measurement_unit")
    # list_filter = ("name", "measurement_unit")
    ordering = ("name",)
    search_fields = ("name",)
    empty_value_display = "empty"
