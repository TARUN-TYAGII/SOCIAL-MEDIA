import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CreatePost } from "./";

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <div className="post-wrapper" id={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/user/${post.user._id}`}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
                    alt="user-pic"
                  />
                </Link>

                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">Bhot phle</span>
                </div>
              </div>

              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
                    alt="like-icon"
                  />
                </div>
                <span>{post.likes.length}</span>
                <div className="post-comments-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/13/13673.png"
                    alt="post-comment"
                  />

                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="start typing a comment..." />
              </div>

              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Tarun</span>
                    <span className="post-comment-time">Bhot Phle</span>
                    <span className="post-comment-likes">2</span>
                  </div>
                  <div className="post-comment-content">Kuch bhi</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
