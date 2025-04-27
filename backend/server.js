const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;
// connect to MongoDB
connectDB();

app.get('/', (req, res) => {
	res.send('Welcome to Fash Mode API');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
