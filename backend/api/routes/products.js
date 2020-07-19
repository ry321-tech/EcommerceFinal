const express = require('express');
const router = express.Router();
const multer = require('multer');

const { userAuth, adminAuth } = require('../middleware/check-auth');

const {
  getAllProducts,
  createOneProduct,
  getProductById,
} = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startWith('image')) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter: fileFilter
});

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', adminAuth, upload.single('productImage'), createOneProduct);

module.exports = router;
