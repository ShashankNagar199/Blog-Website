package com.project.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.models.Comment;
import com.project.backend.models.User;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
	
	List<Comment> findByUser(User user);
	
}
