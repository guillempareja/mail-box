const { Router } = require('express');
const router = Router();

const {
  login,
  refreshToken,
} = require('../controllers/mineco-api');

router.post('/login', login);
router.post('/refreshToken', refreshToken);

module.exports = router;
