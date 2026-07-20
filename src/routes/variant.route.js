const express = require('express');
const { getAllVariants, getVariantById, createVariant, updateVariant, deleteVariant, addVariant, allVariant } = require('../controllers/variant.controller');
const router = express.Router();

// Here this is Mongo route
// router.get('/getallvariants', getAllVariants);
// router.get('/:id', getVariantById);
// router.post('/createvariant', createVariant);
// router.put('/update/:id', updateVariant);
// router.delete('/delete/:id', deleteVariant);


// Here this is MySQL route
router.get('/allvariant', allVariant);
router.post('/addvariant', addVariant);

module.exports = router;