const { Router } = require('express');
const router = Router();

const {
  login,
  refreshToken,
  test,
} = require('../controllers/mineco-api');

router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.get('/test', test);

module.exports = router;
