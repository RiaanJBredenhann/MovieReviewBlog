import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom'
import movieDataService from '../services/movies';

const Movie = props => {

    //-- we have a movie state variable to hold the specific movie we are currently showing in the Movie component
    //-- we set its initial values to null, empty strings or an empty array
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    //-- this method calls get() of MovieDataService
    const getMovie = id => {
        movieDataService.get(id)
        .then(response => {
            setMovie(response.data)
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    //-- we provide props.match.params.id into the second argument array
    //-- this means that useEffect should be called when the component first renders,
    //   and also each time the value of props.match.params.id (which holds that movie id) changes

    //-- useEffect without a second argument, is called each time a state change occurs in its body
    //-- useEffect with an empty array in its second argument gets called only the first time the component renders
    //-- useEffect with a state variable in the array gets called each time the state variable changes
    useEffect(() => {
        getMovie(props.match.params.id)
    }, [props.match.params.id])

    return (
        <div>

        </div>
    )

}

export default Movie;