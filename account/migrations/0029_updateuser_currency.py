# Generated by Django 3.2.19 on 2024-06-10 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0028_alter_user_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='updateuser',
            name='currency',
            field=models.CharField(choices=[('$', 'USD'), ('€', 'EUR'), ('£', 'GBP')], default='$', max_length=2),
        ),
    ]
