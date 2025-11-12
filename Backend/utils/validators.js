const validators = {
  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidName: (name) => {
    return name && name.trim().length >= 2 && name.trim().length <= 100;
  },

  isValidRating: (rating) => {
    return Number.isInteger(rating) && rating >= 1 && rating <= 5;
  },

  isValidComment: (comment) => {
    return comment && comment.trim().length >= 10 && comment.trim().length <= 500;
  },

  isValidObjectId: (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
};

module.exports = validators;
