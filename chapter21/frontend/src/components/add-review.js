import React, { useState } from 'react';
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const addReview = props => {

    let editing = false;
    let initialReviewState = "";

    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const onChangeReview = e => {
        const review = e.targte.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id // get movie_id directly from url
        }
    }

    MovieDataService.createReview(data)
    .then(response => {
        setSubmitted(true);
    })
    .catch(e => {
        console.log(e)
    })

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted successfully</h4>
                    <Link to={'/movies/' + props.match.params.id}>Back to Movie</Link>
                </div>
            ) : (
                <Form>
                    <Form.Group>
                        <Form.Label>{editing ? "Edit" : "Create"}</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            value={review}
                            onChange={onChangeReview}>
                        </Form.Control>
                    </Form.Group>
                    <Button variant='primary' onClick={saveReview}>Submit</Button>
                </Form>
            )}
        </div>
    )

}

export default AddReview;