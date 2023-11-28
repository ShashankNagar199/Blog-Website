package com.project.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.models.Category;
import com.project.backend.services.CategoryService;

@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {

	class CategoryUtil {
		private String cat;
		public void setCat(String cat) {
			this.cat = cat;
		}
		
		public String getCat() {
			return cat;
		}
		
		@Override
		public String toString() {
			// TODO Auto-generated method stub
			return "haha";
		}
	}
	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping("/all")
	public List<String> getAllCategories() {
		
		List<Category> categories =  categoryService.getAllCategories();
		List<String> categoriesStrings = new ArrayList<>();
		for (Category category : categories) {
			categoriesStrings.add(category.getCategoryName());
		}
		
		return categoriesStrings;
	}
	
	@PostMapping("/new-category")
	public String addNewCategory(@RequestBody Map<String, Object> map) {
		String newCategory = (String) map.get("category");
		System.out.println(newCategory);
		Category category = new Category();
		category.setCategoryName(newCategory);		
		categoryService.saveCategory(category);

		return "sucess";
	}
}
