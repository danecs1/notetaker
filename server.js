//1 require the express module
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//2 create an instance of the express app
const app = express();

//3 specify port for express to use
const PORT = process.env.PORT || 2500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//4 listen for requests on the app to the stated port.
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

//module.exports = app;
