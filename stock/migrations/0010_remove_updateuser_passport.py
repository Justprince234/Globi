# Generated by Django 4.1.2 on 2023-06-26 22:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0009_alter_history_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='updateuser',
            name='passport',
        ),
    ]
