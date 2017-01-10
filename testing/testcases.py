from contextlib import contextmanager
from django.test import TestCase as DjangoTestCase
from users.models import User


class TestCase(DjangoTestCase):
    def setUp(self):
        self.staff = User.objects.create(email='staff@foo.bar', is_staff=True, username='staff')
        self.staff.set_password(self.get_password(self.staff.email))
        self.staff.save()
        self.guest = User.objects.create(email='guest@foo.bar', username='guest')
        self.guest.set_password(self.get_password(self.guest.email))
        self.guest.save()

    def get_password(self, email):
        return email + 'password'

    def log_in_user(self, user):
        success = self.client.login(email=user.email, password=self.get_password(user.email))
        self.assertTrue(success)
        self.active_user = user

    def log_out_user(self):
        self.client.logout()
        self.active_user = None

    @contextmanager
    def logged_in_user(self, user):
        self.log_in_user(user)
        yield
        self.log_out_user()
