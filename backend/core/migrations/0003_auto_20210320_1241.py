# Generated by Django 3.1.7 on 2021-03-20 12:41

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20210320_1240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='date_joined',
            field=models.DateField(default=datetime.datetime(2021, 3, 20, 12, 41, 32, 796758, tzinfo=utc), verbose_name='date of joining'),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateField(default=datetime.datetime(2021, 3, 20, 12, 41, 32, 796758, tzinfo=utc), verbose_name='date of joining'),
        ),
    ]
