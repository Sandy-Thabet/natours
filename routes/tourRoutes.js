const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');

const authController = require('../controllers/authConrtoller');
// router.param('id', tourController.checkId);

const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restirctTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restirctTo('user'),
    reviewController.createNewReview,
  );

module.exports = router;
