const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.vwsfnb9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try {
    // Connect the client to the server	(optional starting in v4.7)
		await client.connect();

		const collections = client.db('toy_market').collection('toys');

		// get all toys from database 
		app.get('/toys', async(req, res) => {
			const result = await collections.find().toArray();
			res.send(result);
		})

		app.get('/toys/:id', async(req, res) => {
			const id = req.params.id;
			const query = {_id : new ObjectId(id)}
			const result = await collections.findOne(query);
			res.send(result);
		})





    // Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
    // Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);



app.get('', (req, res) => {
	res.send('toy server in running ');
})
app.listen(port, () => {
	console.log(`server is running on  port : ${port} and ${process.env.USER_NAME}`)
})