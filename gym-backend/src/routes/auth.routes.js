const router = require('express').Router();
const { login, createAdmin } = require('../controllers/auth.controller');

router.get('/create-admin', createAdmin); // one time
router.post('/login', login);

module.exports = router;
