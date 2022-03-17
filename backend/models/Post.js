/**
 * Create Post model
 */
class Post {
  constructor(userId, title, imageUrl, content) {
    this.userId = userId,
    this.title = title,
    this.imageUrl = imageUrl,
    this.content = content
  }
};


module.exports = Post;