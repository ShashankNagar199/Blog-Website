package com.project.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.project.backend.models.Category;
import com.project.backend.models.Comment;
import com.project.backend.models.CommentDisplayer;
import com.project.backend.models.Post;
import com.project.backend.models.User;
import com.project.backend.services.CategoryService;
import com.project.backend.services.CommentService;
import com.project.backend.services.PostService;
import com.project.backend.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/posts")
public class PostsController {

	@Autowired
	Gson gson = null;

	@Autowired
	CategoryService categoryService = null;

	@Autowired
	UserService userService = null;

	@Autowired
	PostService postService = null;

	@Autowired
	CommentService commentService = null;

	@PostMapping("/add-post")
	public String addPost(@ModelAttribute Post post) {
		System.out.println("add post hit");
		// System.out.println(post.toString());
		// System.out.println(post.getCat());

		Category category = getCategoryFromName(post.getCat());
		post.setCategory(category);

		User postingUser = userService.getUser(post.getPostingUserID()).orElse(null);
		post.setApproved(false); // As post may be edited also and hence we want to keep it
		post.setUser(postingUser);
		System.out.println(post);
		postService.savePost(post);
		return "success";
	}

	@GetMapping("/user-posts")
	public List<Post> getAllUserPosts(@RequestParam int id) {
		User user = userService.getUser(id).orElse(null);
		return postService.getAllPostsOfUser(user);
	}

	@GetMapping("/others-posts")
	public List<Post> getOtherUsersPosts(@RequestParam int id) {
		User user = userService.getUser(id).orElse(null);
		return postService.getAllPostsOfOthers(user);
	}

	@GetMapping("/all")
	public List<Post> getAllPosts() {
		List<Post> allPosts = postService.getAllPosts();
		return allPosts;
	}
	
	@PostMapping("/approve/{id}")
	public String approvePost(@PathVariable int id) {
		Post post = postService.getPostById(id);
		post.setApproved(true);
		postService.savePost(post);
		return "success";
	}

	@DeleteMapping("/delete/{id}")
	public String deletePost(@PathVariable int id) {
		Post post = postService.getPostById(id);
		List<Comment> comments = post.getComments();

		for (Comment comment : comments) {
			commentService.deleteComment(comment);
		}

		postService.deletePostById(id);
		return "success";
	}

	@PutMapping("/edit/{id}")
	public String editPost(@PathVariable int id, @RequestBody Map<String, Object> map) {
		String title = (String) map.get("title");
		String description = (String) map.get("description");
		String body = (String) map.get("body");
		String category = (String) map.get("category");
		String image = (String) map.get("image");
		
		//System.out.println("Hit");
		//System.out.println(id + " " + title + " "+ body + " " + category + " " + description + " " + image);
		Post post = postService.getPostById(id);
		//System.out.println(post);
		post.setDescription(description);
		post.setBody(body);
		post.setImageString(image);
		post.setTitle(title);
		//System.out.println(post);
		postService.savePost(post);
		return "success";
	}
	
	@PostMapping("/add-comment/{id}")
	public List<String> addCommentToPost(@PathVariable int id , @RequestBody Map<String, Object> commentData) {
		int userID = (int) commentData.get("userID");
		String commentString = (String) commentData.get("commentString");
		Post post = postService.getPostById(id);
		List<Comment> comments = post.getComments();
		if (comments == null) {
			comments = new ArrayList<>();
		}
		
		Comment comment = new Comment();
		comment.setCommentContent(commentString);
		User user = userService.getUser(userID).orElse(null);
		comment.setUser(user);
		
		commentService.saveComment(comment);
		comments.add(comment);
		
		postService.savePost(post);
		
		List<String> res = new ArrayList<>();
		String userImage =  user.getImageString();
		res.add(userImage);
		res.add(user.getUsername());
		res.add(commentString);
		return res;
	}
	
	@GetMapping("/comments/{id}")
	public List<CommentDisplayer> getAllCommentsOfPost(@PathVariable int id) {
		Post post = postService.getPostById(id);
		List<Comment> comments = post.getComments();
		List<CommentDisplayer> commentDisplayers = new ArrayList<>();
		
		for (Comment comment : comments) {
			CommentDisplayer displayer = new CommentDisplayer();
			String userImage = comment.getUser().getImageString();
			String commentContent = comment.getCommentContent();
			String username = comment.getUser().getUsername();
			
			displayer.setCommentContent(commentContent);
			displayer.setUserImage(userImage);
			displayer.setUsername(username);
			commentDisplayers.add(displayer);
		}
		
		return commentDisplayers;
	}
	
	public User getUserFromID(int id) {
		User user = userService.getUser(id).orElse(null);
		return user;
	}

	public Category getCategoryFromName(String name) {
		List<Category> categories = categoryService.getAllCategories();

		for (Category category : categories) {
			if (category.getCategoryName().equalsIgnoreCase(name)) {
				return category;
			}
		}

		return null;
	}
}
