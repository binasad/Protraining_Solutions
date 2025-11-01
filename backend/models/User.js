const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true },
    roles: { type: [String], default: ['customer'] }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (passwordPlain) {
  return bcrypt.compare(passwordPlain, this.passwordHash);
};

userSchema.statics.hashPassword = async function (passwordPlain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(passwordPlain, salt);
};

module.exports = mongoose.model('User', userSchema);
