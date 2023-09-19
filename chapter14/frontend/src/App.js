import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from './components/add-review';
import Login from './components/login';
import MoviesList from './components/movies-list';
import Movie from './components/movie';

function App() {
  return (
    <div className="App">
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link>
              <Link to={'/movies'}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              { user ? (
                <a>Logout User</a>
              ) : (
                <Link to={'/login'}>Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
