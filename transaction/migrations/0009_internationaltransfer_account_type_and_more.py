# Generated by Django 4.1.2 on 2023-06-21 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0008_alter_localtransfer_to_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='internationaltransfer',
            name='account_type',
            field=models.CharField(choices=[('Savings', 'Savings'), ('Checking', 'Checking')], default='Savings', max_length=20),
        ),
        migrations.AddField(
            model_name='localtransfer',
            name='account_type',
            field=models.CharField(choices=[('Savings', 'Savings'), ('Checking', 'Checking')], default='Savings', max_length=20),
        ),
    ]
