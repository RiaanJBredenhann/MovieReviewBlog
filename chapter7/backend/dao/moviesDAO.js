import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

// movies stores the reference to the database
let movies

//-- we then export the class MoviesDAO which contains an async method injectDB
//   injectDB is called as soon as the server starts and provides the database reference to movies --//
export default class MoviesDAO {
    static async injectDB(conn) {
        // if there already is a reference we return
        if (movies) {
            return
        }
        // else, we connect to the database name and movies collection
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies')
        }
        // if we fail, we send an error message to the console
        catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    //-- the getMovies method accepts a filter object as its first argument
    //   The default filter has no filters, retrieves results at page 0 and retrieves 20 movies per page
    //   In our app, we provide filtering results by movie title 'title' and movie rating 'rated' --//
    static async getMovies({// default filter
        filters = null,
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } }
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } }
            }
        }

        //-- we then find all movies that fit our query and assign it to a cursor
        //   if there is any error, we just return an empty moviesList and totalNumMovies to be 0 --//
        let cursor
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return { moviesList, totalNumMovies }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }

    // static async getMovieById(id){        
    //     try{                                                 
    //         return await movies.aggregate([
    //             {
    //                 $match: {
    //                     _id: new ObjectId(id),
    //                 }
    //             }    ,
    //             { $lookup:
    //                 {
    //                     from: 'reviews',
    //                     localField: '_id',
    //                     foreignField: 'movie_id',
    //                     as: 'reviews',
    //                 }
    //             }       
    //         ]).next()            
    //     }
    //     catch(e){
    //         console.error(`something went wrong in getMovieById: ${e}`)
    //         throw e
    //     }
    // }

    // static async getRatings(){
    //     let ratings = []
    //     try{
    //         ratings = await movies.distinct("rated") 
    //         return ratings
    //     }
    //     catch(e){
    //         console.error(`unable to get ratings, $(e)`)
    //         return ratings
    //     }
    // }

}
