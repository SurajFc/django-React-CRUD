# Generated by Django 3.1.7 on 2021-03-20 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210320_1243'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='user',
            name='date_joined',
        ),
    ]
