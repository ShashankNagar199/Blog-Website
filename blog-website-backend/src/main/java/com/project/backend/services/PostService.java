package com.project.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend.models.Post;
import com.project.backend.models.User;
import com.project.backend.repositories.PostRepository;
import com.project.backend.repositories.UserRepository;

@Service
public class PostService {
	
	@Autowired
	PostRepository postRepository;
	
	public List<Post> getAllPostsOfUser(User user) {
		return postRepository.findByUser(user);
	}

	public List<Post> getAllPostsOfOthers(User user) {
		return postRepository.findByIsApprovedAndUserNot(true, user);
	}
	
	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}
	
	public Post getPostById(int id) {
		return postRepository.getById(id);
	}
	
	public void deletePostById(int id) {
		postRepository.deleteById(id);
	}
	
	public void savePost(Post post) {
		postRepository.save(post);
	}
	
	public void deletePostEntity(Post post) {
		postRepository.delete(post);
	}
}
