const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/index');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
// allow cross-origin request
app.use(cors());
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('database connected'))
	.catch((err) => console.log('Error connecting to db'));

app.use(express.static('public'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
