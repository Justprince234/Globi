# Generated by Django 4.1.2 on 2023-06-15 15:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0002_remove_updateuser_passport_1'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='updateuser',
            name='confirm_transaction_pin',
        ),
        migrations.RemoveField(
            model_name='updateuser',
            name='transaction_pin',
        ),
    ]
