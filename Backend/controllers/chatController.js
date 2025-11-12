const Message = require('../models/Message');

// Get chat history for a user
exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 100, conversationId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const query = { userId };
    if (conversationId) {
      query.conversationId = conversationId;
    }

    const messages = await Message.find(query)
      .sort({ createdAt: 1 })
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message,
    });
  }
};

// Save a message
exports.saveMessage = async (req, res) => {
  try {
    const { userId, content, role, conversationId, metadata } = req.body;

    // Validation
    if (!userId || !content || !role) {
      return res.status(400).json({
        success: false,
        message: 'userId, content, and role are required',
      });
    }

    if (!['user', 'assistant', 'system'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be user, assistant, or system',
      });
    }

    if (content.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message content cannot exceed 2000 characters',
      });
    }

    const newMessage = new Message({
      userId,
      content,
      role,
      conversationId: conversationId || `conv_${Date.now()}`,
      metadata: metadata || {},
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message saved successfully',
      data: savedMessage,
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving message',
      error: error.message,
    });
  }
};

// Delete chat history for a user
exports.deleteChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { conversationId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const query = { userId };
    if (conversationId) {
      query.conversationId = conversationId;
    }

    const result = await Message.deleteMany(query);

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} messages`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting messages',
      error: error.message,
    });
  }
};

// Get all conversations for a user
exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const conversations = await Message.aggregate([
      { $match: { userId } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$content' },
          lastMessageTime: { $first: '$createdAt' },
          messageCount: { $sum: 1 },
        },
      },
      { $sort: { lastMessageTime: -1 } },
    ]);

    res.json({
      success: true,
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching conversations',
      error: error.message,
    });
  }
};
