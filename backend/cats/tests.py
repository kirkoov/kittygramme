from http import HTTPStatus

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

User = get_user_model()


class CatsAPITestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="auth_user")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_list_exists(self):
        """Check the cats page is 200 OK."""
        response = self.client.get("/api/cats/")
        self.assertEqual(response.status_code, HTTPStatus.OK)
