import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

//-- functional component that receives and uses props
//-- we use the React useState hook to create the movies, searchTitle, searchRating and ratings state variables
//-- the searchTitle and searchRating state variables keep track of what
//   a user has entered into the search form fields in the Movies List page
const MoviesList = props => {

    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    //-- the useEffect hook is called after the component renders
    //-- so if we want to tell the component to perform some code after rendering, we include it here
    //-- in our case, after the component renders, we want to retrieve movies and ratings
    //-- we specify an empty array in the second argument of the method so that its only called once
    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    //-- calls MovieDataService.getAll()
    //-- getAll returns a promise with the movies retrieved from the database 
    //   and we set it to the movies state variable with setMovies(response.data.movies)
    const retrieveMovies = () => {
        MovieDataService.getAll()
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
            })
            .catch(e => {
                console.log(e)
            })
    }

    //-- calls MovieDataService.getRatings to get the list of distinct ratings from the database
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

    //-- will be called whenever a user types into the search title field 
    //   and will then take the entered value and set it to the component state
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    //-- will be called whenever a user types into the search rating field 
    //   and will then take the entered value and set it to the component state
    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByTitle}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchRating} >
                                    {ratings.map(rating => {
                                        return (
                                            <option value={rating}>{rating}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByRating}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )

}

export default MoviesList;