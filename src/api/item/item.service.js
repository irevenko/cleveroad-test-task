const dayjs = require('dayjs');
const pool = require('../../helpers/db');

const itemService = {
  createItem: (data, userId, callback) => {
    const date = Date.now();
    const formatedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');

    pool.query(
      `INSERT INTO item(title, price, creation_date, image, user_id_user)
         values(?, ?, ?, ?, ?)`,
      [
        data.title,
        data.price,
        formatedDate,
        data.image,
        userId,
      ],
      (error, dbResults) => {
        if (error) {
          return callback(error);
        }
        return callback(null, dbResults);
      },
    );
  },
  updateItem: (data, itemId, callback) => {
    pool.query(
      `UPDATE item
       SET title = ?, price = ?
       WHERE id_item = ?;`,
      [
        data.title,
        data.price,
        itemId,
      ],
      (error, dbResults) => {
        if (error) {
          return callback(error);
        }
        return callback(null, dbResults);
      },
    );
  },
  updateItemImage: (image, itemId, callback) => {
    pool.query(
      `UPDATE item
       SET image = ?
       WHERE id_item = ?;`,
      [
        image,
        itemId,
      ],
      (error, dbResults) => {
        if (error) {
          return callback(error);
        }
        return callback(null, dbResults);
      },
    );
  },
  deleteItem: (itemId, callback) => {
    pool.query(
      'DELETE FROM item WHERE id_item = ?',
      [itemId],
      (error, dbResults) => {
        if (error) {
          return callback(error);
        }
        return callback(null, dbResults);
      },
    );
  },
  getItemById: (itemId, callback) => {
    pool.query(
      'SELECT * FROM item WHERE id_item = ?',
      [itemId],
      (error, dbResults) => {
        if (error) {
          callback(error);
        }
        return callback(null, dbResults[0]);
      },
    );
  },
  getAllItems: (callback) => {
    pool.query(
      'SELECT * FROM item',
      [],
      (error, dbResults) => {
        if (error) {
          callback(error);
        }
        return callback(null, dbResults);
      },
    );
  },
};

module.exports = itemService;
