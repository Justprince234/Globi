from account.models import User
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Creates a superuser.'

    def handle(self, *args, **options):
        if not User.objects.filter(username='info').exists():
            if not User.objects.filter(email='info@globicapital.com').exists():
                User.objects.create_superuser(
                    username='info',
                    email='info@globicapital.com',
                    password='Ejigbo234'
                )
            print('Superuser has been created!.')