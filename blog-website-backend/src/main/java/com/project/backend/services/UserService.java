package com.project.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend.models.User;
import com.project.backend.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public User getUser(String username, String password) {
		return userRepository.findByUsernameAndPassword(username, password);
	}
	
	public User getUserByUsernameOrEmail(String email, String username) {
		User user = userRepository.findByEmail(email);
		if (user != null) return user;
		
		user = userRepository.findByUsername(username);
		return user;
	}
	
	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	public void deleteUser(int id) {
		userRepository.deleteById(id);
	}
	
	public void saveUser(User user) {
		userRepository.save(user);
	}
	
	public Optional<User> getUser(int id) {
		return userRepository.findById(id);
	}
}
