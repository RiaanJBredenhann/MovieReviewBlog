import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

async function main() {

    dotenv.config()
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)
    const port = process.env.PORT || 8000

    try {
        // Connect to the MongoDB cluster
        await client.connect()
        // right after connecting to the database and just before we start the server,
        // we call injectDB to get our initial reference to the movies collection in the database
        await MoviesDAO.injectDB(client)

        //    await ReviewsDAO.injectDB(client)

        app.listen(port, () => {
            console.log('server is running on port:' + port);
        })

    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error);