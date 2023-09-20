import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';

//-- functional component that receives and uses props
//-- we use the React useState hook to create the movies, searchTitle, searchRating and ratings state variables
//-- the searchTitle and searchRating state variables keep track of what
//   a user has entered into the search form fields in the Movies List page
const MoviesList = props => {

    const [ movies, setMovies ] = useState([]);
    const [ searchTitle, setSearchTitle ] = useState("");
    const [ searchRating, setSearchRating ] = useState("");
    const [ ratings, setRatings ] = useState(["All Ratings"]);

    //-- the useEffect hook is called after the component renders
    //-- so if we want to tell the component to perform some code after rendering, we include it here
    //-- in our case, after the component renders, we want to retrieve movies and ratings
    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    const retrieveMovies = () => {
        MovieDataService.getAll()
        .then(response => {
            console.log(response.data)
            setMovies(respnse.data.movies)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings()
        .then(response => {
            console.log(response.data)
            setRatings(["All Ratings"].concat(response.data))
        })
        .catch(e => {
            console.log(e)
        })
    }

}

export default MoviesList;