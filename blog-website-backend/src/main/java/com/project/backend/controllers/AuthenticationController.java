package com.project.backend.controllers;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.models.Comment;
import com.project.backend.models.Post;
import com.project.backend.models.User;
import com.project.backend.services.CommentService;
import com.project.backend.services.PostService;
import com.project.backend.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/")
public class AuthenticationController {

	@Autowired
	UserService userService;

	@Autowired
	PostService postService;

	@Autowired
	CommentService commentService;
	
	@PostMapping("/register")
	public String registerUserInDB(@ModelAttribute User user) {
		System.out.println("Register hit!");

		System.out.println(user.toString());
		User alreadyUser = userService.getUserByUsernameOrEmail(user.getEmail(), user.getUsername());
		if (alreadyUser != null) {
			return "duplicate";
		}
		userService.saveUser(user);
		// System.out.println(request.toString());
		return "success";
	}

	@GetMapping("/login")
	public User loginUser(@RequestParam String username, @RequestParam String password) {
		System.out.println("Login servlet hit!");
		System.out.println(username + " " + password);
		User user = userService.getUser(username, password);
		return user;
	}
	
	@GetMapping("/all-users")
	public List<User> getAllUsers() {
		List<User> users = userService.findAll();
		return users;
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteUser( @PathVariable int id) {
		
		User user = userService.getUser(id).orElse(null);
		List<Comment> commentsByUser = commentService.getCommentsOfUser(user);
		HashSet<Comment> setOfComments = new HashSet<>(commentsByUser);
		List<Post> posts = postService.getAllPosts();
		
		for (Post post : posts) {
			if (post.getUser() == user) {
				for (Comment comment : post.getComments()) {
					post.getComments().remove(comment);
					postService.savePost(post);
					commentService.deleteComment(comment);
				}
				
				postService.deletePostEntity(post);
			} else {
				for (Comment comment : post.getComments()) {
					if (setOfComments.contains(comment)) {
						post.getComments().remove(comment);
						postService.savePost(post);
						commentService.deleteComment(comment);
						setOfComments.remove(comment);
					}
				}
								
			}
		}
		
//		for (Comment comment : commentsByUser) {
//			commentService.deleteComment(comment);
//		}
//
//		List<Post> posts = postService.getAllPostsOfUser(user);
//		for (Post post : posts) {
//			postService.deletePostEntity(post);
//		}
		userService.deleteUser(id);
		return "success";
	}
}
