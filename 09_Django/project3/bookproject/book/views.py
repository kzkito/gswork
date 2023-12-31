from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
# from django.contrib.auth import logout
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, DeleteView, UpdateView
from .models import Book

# Create your views here.
class ListBookView(LoginRequiredMixin, ListView):
    template_name = 'book/book_list.html'
    model = Book

class DetailBookView(LoginRequiredMixin, DetailView):
    template_name = 'book/book_detail.html'
    model = Book

class CreateBookView(LoginRequiredMixin, CreateView):
    template_name = 'book/book_create.html'
    model = Book
    fields = ('title', 'text', 'category')
    success_url = reverse_lazy('list-book')
    
class DeleteBookView(LoginRequiredMixin, DeleteView):
    template_name = 'book/book_delete.html'
    model = Book
    success_url = reverse_lazy('list-book')
    
class UpdateBookView(LoginRequiredMixin, UpdateView):
    template_name = 'book/book_update.html'
    fields = ('title', 'text', 'category')
    success_url = reverse_lazy('list-book')
    model = Book
    
def index_view(request):
    object_list = Book.objects.order_by('category')
    return render(request, 'book/index.html', {'object_list': object_list})

# def logout_view(request):
#     logout(request)
#     return redirect('index')
