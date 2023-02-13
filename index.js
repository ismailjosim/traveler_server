require('dotenv').config()
require('colors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.s9x13go.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

// middleware
app.use(cors())
app.use(express.json())

const dbConnect = async () => {
	try {
		await client.connect()
		console.log('Travel Database Connected!')
	} catch (error) {
		console.log(error.name, error.message)
	}
}
dbConnect()

// Database : collections
const blogCollection = client.db('traveler').collection('blogs');
const destinationCollection = client.db('traveler').collection('destinations');
const destinationDetails = client.db('traveler').collection('destinationDetails');
const packageCollection = client.db('traveler').collection('packages');
const packageDetails = client.db('traveler').collection('packageDetails');

// Get: default end point
app.get('/', (req, res) => {
	res.send(`<div>Traveler Server Connected 🎉</div>`)
})

// Get : all Blogs
app.get('/blogs', async (req, res) => {
	try {
		const query = {}
		const blogs = await blogCollection.find(query).toArray()
		res.send({
			status: true,
			blogs: blogs,
		})
	} catch (error) {
		res.send({
			status: false,
			error: error.message,
		})
	}
})

// Get: all destinations
app.get('/destinations', async (req, res) => {
	try {
		const query = {}
		const destinations = await destinationCollection.find(query).toArray()
		res.send({
			status: true,
			destinations: destinations,
		})
	} catch (error) {
		res.send({
			status: false,
			error: error.message,
		})
	}
})
// Get: single destination details
app.get('/destination/:id', async (req, res) => {
	try {
		const id = Number(req.params.id);
		const query = { placeId: id };
		const destination = await destinationDetails.findOne(query);
		res.send({
			status: true,
			destination: destination
		})

	} catch (error) {
		res.send({
			status: false,
			error: error.message,
		})
	}
})


// GET: All Packages
app.get('/packages', async (req, res) => {
	try {
		const query = {};
		const packages = await packageCollection.find(query).toArray();
		res.send({
			status: true,
			packages: packages
		})

	} catch (error) {
		res.send({
			status: false,
			error: error.message,
		})
	}
})

// GET: single Package Details Using ID
app.get('/package/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const query = { packageId: id };
		const detailsPackage = await packageDetails.findOne(query);
		res.send({
			status: true,
			detailsPackage: detailsPackage
		})

	} catch (error) {
		res.send({
			status: false,
			error: error.message,
		})
	}
})


// listen app
app.listen(port, () =>
	console.log(`Server Running on Port ${ port }`.random.italic),
)
