const { verify } = require('jsonwebtoken');
const itemService = require('./item.service');

const itemController = {
  createItem: (req, res) => {
    const { body } = req;

    verify(req.token, process.env.JWT_SECRET_KEY, (err, authorizedData) => {
      const userId = authorizedData && authorizedData.result.id_user;
      const userInfo = authorizedData && authorizedData.result;

      if (err) {
        res.sendStatus(401);
        return;
      }
      if (!body.title) {
        res.status(422).json({ field: 'title', message: 'Title is required' });
        return;
      }
      if (!body.price) {
        res.status(422).json({ field: 'price', message: 'Price is required' });
        return;
      }

      itemService.createItem(body, userId, (err, dbResults) => {
        if (err) {
          console.error(err);
        }
        itemService.getItemById(dbResults.insertId, (err, dbResults) => {
          if (err) {
            console.error(err);
          }
          res.status(200).json({ dbResults, userInfo });
        });
      });
    });
  },
  updateItem: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    verify(req.token, process.env.JWT_SECRET_KEY, (err, authorizedData) => {
      const userInfo = authorizedData && authorizedData.result;

      if (err) {
        res.sendStatus(401);
        return;
      }
      if (!body.title) {
        res.status(422).json({ field: 'title', message: 'Title is required' });
        return;
      }
      if (!body.price) {
        res.status(422).json({ field: 'price', message: 'Price is required' });
        return;
      }
      if (body.title.length < 3) {
        res.status(422).json({ field: 'title', message: 'Title should contain at least 3 characters' });
        return;
      }

      itemService.updateItem(body, id, (err, dbResults) => {
        if (err) {
          console.error(err);
        }
        if (dbResults.message.includes('Rows matched: 0')) {
          res.sendStatus(404);
          return;
        }

        itemService.getItemById(id, (err, dbResults) => {
          if (err) {
            console.error(err);
          }
          res.status(200).json({ dbResults, userInfo });
        });
      });
    });
  },
  deleteItem: (req, res) => {
    const { id } = req.params;

    verify(req.token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        res.sendStatus(401);
        return;
      }

      itemService.deleteItem(id, (err, dbResults) => {
        if (err) {
          console.error(err);
        }
        if (dbResults.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      });
    });
  },
  updateItemImage: async (req, res) => {
    const { id } = req.params;
    const image = req.file.originalname;
    const imageSize = req.file.size;

    verify(req.token, process.env.JWT_SECRET_KEY, (err, authorizedData) => {
      const userInfo = authorizedData && authorizedData.result;

      if (err) {
        res.sendStatus(401);
        return;
      }
      if (imageSize > process.env.MAX_IMAGE_SIZE) {
        res.status(422).json({ field: 'image', message: `The file ${image} is too big.` });
        return;
      }

      itemService.updateItemImage(image, id, (err, dbResults) => {
        if (err) {
          console.error(err);
        }
        if (dbResults.message.includes('Rows matched: 0')) {
          res.sendStatus(404);
          return;
        }
        itemService.getItemById(id, (err, dbResults) => {
          if (err) {
            console.error(err);
          }
          res.status(200).json({ dbResults, userInfo });
        });
      });
    });
  },
  getItemsList: (req, res) => {
    itemService.getAllItems((err, dbResults) => {
      if (err) {
        console.error(err);
      }
      res.status(200).json({ dbResults });
    });
  },
  getItemById: (req, res) => {
    const { id } = req.params;

    itemService.getItemById(id, (err, dbResults) => {
      if (err) {
        console.error(err);
      }
      if (!dbResults) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ dbResults });
      }
    });
  },
};

module.exports = itemController;
