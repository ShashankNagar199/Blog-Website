package com.project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsernameAndPassword(String username, String password);
	User findByUsername(String username);
	User findByEmail(String email);
}
