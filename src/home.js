import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import useMultiple from './custom-hooks/useMultiple';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomePage = ({ handle_Login_SignUp }) => {
    let [user, handleName] = useState('')
    let [password, handlePass] = useState('')
    let [boo, handleBoo] = useMultiple(false)
    let userLogin = useSelector(state => state.login)

    useEffect(() => {
        if (userLogin) {
            handleName('');
            handlePass('');
        }
    }, [userLogin])

    const logsign = (any) => {
        switch (any) {
            case 'login':
                handle_Login_SignUp({ any, userName: user, password })
                break;

            case 'signup':
                handle_Login_SignUp({ any, userName: user, password })
                handleBoo(true)
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
                <div className='text-center'> <button className='border rounded py-0' onClick={!boo ? () => logsign('login') : () => logsign('signup')}>{!boo ? "Login" : "signUp"}</button></div>
                <div className='text-white text-center'> {!boo ? <>Dont have an account? <button className='border-0 bg-transparent text-white' onClick={() => handleBoo(true)}>signup</button></> : ''}</div>
            </Col>
        </Row>
    </Container >)
}
export default HomePage;