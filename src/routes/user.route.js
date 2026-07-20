const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/getallusers', getAllUsers);
router.get('/:id', getUserById);
router.post('/createuser', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;