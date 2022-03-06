/**
 * Create Post model
 */
class Post {
  constructor(userId, imageUrl, content) {
    this.userId = userId,
    this.imageUrl = imageUrl,
    this.content = content
  }
};


module.exports = Post;