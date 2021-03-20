# Generated by Django 3.1.7 on 2021-03-20 12:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='date_joined',
            field=models.DateField(default=datetime.date(2021, 3, 20), verbose_name='date of joining'),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateField(default=datetime.date(2021, 3, 20), verbose_name='date of joining'),
        ),
    ]
