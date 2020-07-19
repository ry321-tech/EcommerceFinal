const express = require('express');
const router = express.Router();
const checkAuths = require('../middleware/check-auth');

const {
  createUser,
  loginUserAndAdmin,
  isAdmin,
} = require('../controllers/user');

router.post('/create', createUser);
router.post('/login', loginUserAndAdmin);
router.get('/is-admin', checkAuths.userAuth, isAdmin);

module.exports = router;
