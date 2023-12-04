from django import forms
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.models import User
from .models import Post


class ProfileUpdateForm(UserChangeForm):
    profile_picture = forms.ImageField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'profile_picture')
