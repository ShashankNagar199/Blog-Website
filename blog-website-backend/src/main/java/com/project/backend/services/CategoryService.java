package com.project.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend.models.Category;
import com.project.backend.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;

	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}

	public void saveCategory(Category category) {
		categoryRepository.save(category);
	}

	public void deleteCategory(Category category) {
		categoryRepository.delete(category);
	}

	public void deleteCategory(int id) {
		categoryRepository.deleteById(id);
	}
}
