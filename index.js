const express = require('express')
const app = express()

require('./mongodb')
const routes = require('./user/user.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)


app.listen(3001, () => {
    console.log(`Server listening on port ${3001}`);
});