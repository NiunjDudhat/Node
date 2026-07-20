const express = require('express');
const { createTerm, allTerms, getSingleTerm, editTerm, removeTerm } = require('../controllers/term.controller');
const router = express.Router();

// below this is all apis is mysql
router.get('/getall', allTerms);
router.get('/:id', getSingleTerm);
router.post('/createterm', createTerm);
router.put('/update/:id', editTerm);
router.delete('/delete/:id', removeTerm);

module.exports = router;