/**
 * Create reaction model
 */
 class Reaction {
  constructor(postId, userId, reaction) {
    this.postId = postId,
    this.userId = userId,
    this.reaction = reaction
  }
};

module.exports = Reaction;