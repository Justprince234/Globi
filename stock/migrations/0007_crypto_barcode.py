# Generated by Django 4.1.2 on 2023-06-15 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0006_plan_delete_commodity'),
    ]

    operations = [
        migrations.AddField(
            model_name='crypto',
            name='barcode',
            field=models.ImageField(blank=True, null=True, upload_to='photos/%Y/%m/%d/'),
        ),
    ]
