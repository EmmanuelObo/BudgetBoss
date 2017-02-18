# -*- coding: utf-8 -*-
# Generated by Django 1.9.12 on 2017-02-08 01:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('greeting', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('note', models.CharField(max_length=256)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=1000000)),
                ('priority', models.CharField(max_length=10)),
                ('dateCreated', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.RemoveField(
            model_name='note',
            name='list',
        ),
        migrations.AddField(
            model_name='list',
            name='title',
            field=models.CharField(default='Default', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='list',
            name='total',
            field=models.IntegerField(default=10.99),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Note',
        ),
        migrations.AddField(
            model_name='item',
            name='list',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='greeting.List'),
        ),
        migrations.AddField(
            model_name='list',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='greeting.User'),
            preserve_default=False,
        ),
    ]