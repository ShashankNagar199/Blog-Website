package com.project.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.models.Category;
import com.project.backend.models.Post;
import com.project.backend.models.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{
	
	List<Post> findByIsApprovedAndUserNot(boolean approved, User user);
	List<Post> findByCategory(Category category);
	List<Post> findByUser(User user);
}
