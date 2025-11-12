const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: [true, 'Message role is required'],
    },
    conversationId: {
      type: String,
      index: true,
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
messageSchema.index({ userId: 1, createdAt: -1 });
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ userId: 1, conversationId: 1 });

// Static method to get recent messages
messageSchema.statics.getRecentMessages = async function (userId, limit = 100) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

module.exports = mongoose.model('Message', messageSchema);
