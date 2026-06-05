const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', requireAdmin, getUsers);
router.route('/:id').put(requireAdmin, updateUser).delete(requireAdmin, deleteUser);

module.exports = router;
