
const express = require('express');
const uploadController = require('../controllers/imageController');

const router = express.Router();
const isAuth = require('../middlewares/isAuthenticated')

router.get('/:objectID', uploadController.get);
router.get('/name/:filename', uploadController.getByName);
router.get('/', uploadController.getAll);
router.post('/', uploadController.uploadImage);
router.delete('/:objectID',isAuth, uploadController.remove);
router.delete('/name/:filename',isAuth, uploadController.removeByName);
  
 
  
module.exports = router;
