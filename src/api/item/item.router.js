const router = require('express').Router();
const multer = require('multer');
const uuid = require('uuid').v4;
const itemController = require('./item.controller');
const testToken = require('../../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', itemController.getItemsList);
router.get('/:id', itemController.getItemById);

router.post('/', testToken, itemController.createItem);
router.put('/:id', testToken, itemController.updateItem);
router.delete('/:id', testToken, itemController.deleteItem);

router.post('/:id/images', testToken, upload.single('file'), itemController.updateItemImage);

module.exports = router;
