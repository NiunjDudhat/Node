const express = require('express');
const { allTag, createTag, assignProductToTag, getProductToTag } = require('../controllers/tag.controller');
const router = express.Router();

// below this is all apis is mysql
router.get('/getalltag', allTag);
router.post('/createtag', createTag);
router.post('/assignproducttotag', assignProductToTag);
router.get('/getproducttotag', getProductToTag);
// router.get('/removeproducttotag', removeProductToTag);

module.exports = router;