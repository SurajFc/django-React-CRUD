# Generated by Django 3.1.7 on 2021-03-20 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20210320_1241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='date_joined',
            field=models.DateField(auto_now=True, verbose_name='date of joining'),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateField(auto_now=True, verbose_name='date of joining'),
        ),
    ]
