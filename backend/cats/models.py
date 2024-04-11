from typing import Any

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import ManyToManyField, Model

User = get_user_model()


class Achievement(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Cat(models.Model):
    name = models.CharField(max_length=16)
    color = models.CharField(max_length=16)
    birth_year = models.IntegerField()
    owner = models.ForeignKey(
        User, related_name="cats", on_delete=models.CASCADE
    )
    achievements: ManyToManyField[Model | Model | Any, Model | Model | Any] = (
        models.ManyToManyField(Achievement, through="AchievementCat")
    )

    image = models.ImageField(
        upload_to="cats/images/", null=True, default=None
    )

    def __str__(self):
        return self.name


class AchievementCat(models.Model):
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.achievement} {self.cat}"
