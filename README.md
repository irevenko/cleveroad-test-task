# Notes
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

# API cons
- No async/await
- Small test coverage
- Image upload works unstable with russian file names

# Questions
- Middleware
- Error handling
- Project structure
- Logging
- Registered 201 not 200 Item Created 201 not 200
- General API best practices
- Cleveroad's Node frameworks
- Is there TypeScript on Backend
- Wanna do Agriculture or Healthcare projects
