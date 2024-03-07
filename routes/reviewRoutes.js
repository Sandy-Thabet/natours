const express = require('express');
const reviewController = require('../controllers/reviewController');
const authConrtoller = require('../controllers/authConrtoller');

const router = express.Router({ mergeParams: true });

// POST /tour/342yhu234/reviews
// POST /reviews

router.route('/').get(reviewController.getAllReviews);
router
  .route('/')
  .post(
    authConrtoller.protect,
    authConrtoller.restirctTo('user'),
    reviewController.createNewReview,
  );

module.exports = router;
