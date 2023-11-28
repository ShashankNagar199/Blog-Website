package com.project.backend.models;

public class CommentDisplayer {

	private String username;
	private String userImage;
	private String commentContent;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	@Override
	public String toString() {
		return "CommentDisplayer [username=" + username + ", userImage=" + userImage + ", commentContent="
				+ commentContent + "]";
	}

}
