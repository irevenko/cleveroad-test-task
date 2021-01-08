# Tech Task 🧾
Using Node.js, develop a RESTful API that allows you to work with products.
The user registers and gets the opportunity to place an advertisement for the sale of goods, like at OLX (eBay or craigslist) <br>
Main functionality:
- Registration
- Authorization
- Getting data of the current user
- Creation / deletion of goods by an authorized user
- Changing product data by an authorized user
- Loading product image

# Realization Notes 📜
<b>api</b> - is built using express as main library and mysql as DB <br>
<b>auth</b> - is made using JWT <br>
<b>tests</b> - are done with mocha + chai and supertest <br>
<b>images</b> - is a directory where items pictures are stored. Used <b>multer</b> as an image processing library <br>
- <b>joy</b> - for data validation
- <b>dayjs</b> - for generating Dates
- <b>bcrypt</b> - for hashing passwords
- <b>uuid</b> - for generating items image name prefix
- <b>mysql</b> - as a driver for interacting with DB
- <b>dotenv</b> - for enviroment variables
- <b>eslint</b> - for code style and linting (AirBNB style)

# API cons 🆘
- Written using callbacks
- Small test coverage
- No migrations
- Should've use ORM instead of mysql driver
