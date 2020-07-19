const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  name: {
    type: String,
    require: [true, 'Please Provide Name'],
  },
  phone: {
    type: String,
    require: [true, 'Please Provide a Phone Number'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide a valid Emial'],
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-][a-z0-9])?/,
  },
  password: {
    type: String,
    required: [true, 'Pleae Provide Password'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encryptpassword using bryptjs
UserSchema.pre('save', async function (next) {
  //   const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, 10);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userType: this.userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '10h',
    }
  );
};

// Match User Entered password to hashed password in DB [Login]
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
