package com.project.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend.models.Comment;
import com.project.backend.models.User;
import com.project.backend.repositories.CommentRepository;

@Service
public class CommentService {

	@Autowired
	CommentRepository commentRepository = null;
	
	public void saveComment(Comment comment) {
		commentRepository.save(comment);
	}
	
	public List<Comment> getAllComments() {
		return commentRepository.findAll();
	}
	
	public void deleteComment(int id) {
		commentRepository.deleteById(id);
	}
	
	public void deleteComment(Comment comment) {
		commentRepository.delete(comment);
	}
	
	public List<Comment> getCommentsOfUser(User user) {
		return commentRepository.findByUser(user);
	}
}
