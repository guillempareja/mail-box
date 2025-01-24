const { Router } = require('express');
const router = Router();

const {
  login,
  refreshToken,
  search,
  mapping,
  summaryFeedback,
  finalizeWithoutAnswering,
  redirect,
  answer,
  similarConsultations,
  markAsNotSpam
} = require('../controllers/mail-api');

router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/summaryFeedback', summaryFeedback);
router.post('/finalizeWithoutAnswering', finalizeWithoutAnswering);
router.post('/markAsNotSpam', markAsNotSpam);
router.post('/redirect', redirect);
router.post('/answer', answer);
router.get('/search', search);
router.get('/mapping', mapping);
router.get('/similarConsultations', similarConsultations);

module.exports = router;
