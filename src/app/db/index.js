const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://yashdeep0727becse24:sSmOwz4ecHWZjF01@cluster0.uffcj.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');   

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'hehe' };
    const update = {
        $set: {
            title: 'hehehehehehehehehehe'
        }
    };

    const result = await movies.updateOne(query, update);

    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}
}
run().catch(console.dir);