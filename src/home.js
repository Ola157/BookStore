import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const navigate = useNavigate()
    let [user, handleName] = useState('')
    let [password, handlePass] = useState('')
    let [boo, setBoo] = useState(true)

    const add = async (any) => {
        switch (true) {
            case any === 'login':
                try {
                    const response = await axios.post("http://localhost:8600/user/login", { username: user, password },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })
                    if (response.data === "") {
                        alert('Incorrect Details')
                        handleName('');
                        handlePass('');
                    }
                    let { pCheck } = response.data
                    let { _id, username } = pCheck
                    navigate(`/allbooks/${_id}`)
                }

                catch (error) {
                    console.error('Error:', error);
                }
                break;

            case any === 'signup':
                try {
                    const response = await axios.post("http://localhost:8600/user/register", { username: user, password },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })
                    handleName('');
                    handlePass('');
                    alert(response.data)
                }
                catch (error) {
                    console.error('Error:', error);
                }
                setBoo(true)
                break;
        }

    }
    return (<Container className='display pb-5' fluid>
        <Navbar className='justify-content-center bg-black mb-5'>
            <FontAwesomeIcon className='text-white' icon={faBookOpenReader} size="lg" />
        </Navbar>
        <Row className='d-flex justify-content-center mb-5'>
            <Col lg={3} md={6} sm={8} xs={12} className='bg-black p-2 border rounded mt-5 mb-5'>
                <input className='border rounded d-block text-center w-100' value={user} placeholder='username' onInput={(event) => handleName(event.target.value)} />
                <input className='border rounded d-block my-1 text-center w-100' value={password} type="password" placeholder='password' onInput={(event) => handlePass(event.target.value)} />
                <div className='text-center'> <button className='border rounded py-0' onClick={boo ? () => add('login') : () => add('signup')}>{boo ? "Login" : "signUp"}</button></div>
                <div className='text-white text-center'> {boo ? <>Dont have an account? <button className='border-0 bg-transparent text-white' onClick={() => setBoo(false)}>signup</button></> : ''}</div>
            </Col>
        </Row>
    </Container >)
}
export default HomePage;