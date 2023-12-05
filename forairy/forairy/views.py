from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView
from django.views.generic import ListView, CreateView
from django.urls import reverse_lazy
from django.http import JsonResponse

from forairy_app.models import Post, CommentForm


def index(request):
    return render(request, 'index.html')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'success': True})
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})


class CustomLoginView(LoginView):
    template_name = 'login.html'


@login_required
def blog(request):
    return render(request, 'blog.html')


class PostListView(ListView):
    model = Post
    template_name = 'blog.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']


class PostCreateView(CreateView):
    model = Post
    template_name = 'post_form.html'
    fields = ['title', 'content']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    success_url = reverse_lazy('blog')


@login_required
def create_comment(request, post_id):
    post = Post.objects.get(id=post_id)

    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.post = post
            comment.save()

    posts = Post.objects.prefetch_related('comments').all()

    return render(request, 'blog.html', {'form': CommentForm(), 'posts': posts})


def search_results(request):
    query = request.GET.get('q', '')
    posts = Post.objects.filter(title__icontains=query) | Post.objects.filter(content__icontains=query)
    return render(request, 'search_results.html', {'query': query, 'posts': posts})


def get_posts(request):
    posts = [...]  # Fetch posts from your database
    return JsonResponse({'posts': posts})


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})
    return render(request, 'login.html')
