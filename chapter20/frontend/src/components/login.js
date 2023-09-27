import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = props => {

    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const onChangeName = e => {
        const name = e.target.value;
        setName(name);
    }

    const onChangeId = e => {
        const id = e.target.value;
        setId(id);
    }

    const login = () => {
        props.login({
            name: name, 
            id: id
        });
        props.history.push('/');
    }

    return (
        <div>
            <Form>
                <From.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Username'
                        value={name}
                        onChange={onChangeName}>
                    </Form.Control>
                </From.Group>
                <From.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        tupe='text'
                        placeholder='Enter ID'
                        value={id}
                        onChange={onChangeId}>
                    </Form.Control>
                </From.Group>
                <Button variant='primary' onClick={login}>Submit</Button>
            </Form>
        </div>
    )

}

export default Login;