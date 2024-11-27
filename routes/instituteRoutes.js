const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');

// Create a new institute
router.post('/register', instituteController.registerInstitute);

// Fetch available institute types
router.get('/institute-types', instituteController.getInstituteTypes);

// Fetch boards for schools
router.get('/boards', instituteController.getBoards);

// Fetch mediums for schools
router.get('/mediums', instituteController.getMediums);

// Fetch class categories for schools
router.get('/class-categories', instituteController.getClassCategories);

// Fetch standards based on class category
router.get('/standards/:classCategoryId', instituteController.getStandardsByClassCategory);

// Fetch subjects based on standard
router.get('/subjects/:standardId', instituteController.getSubjectsByStandard);

router.post('/create-board', instituteController.createBoard); 

module.exports = router;
