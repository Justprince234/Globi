# Generated by Django 4.1.2 on 2023-06-21 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_history_sender_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12),
        ),
    ]
