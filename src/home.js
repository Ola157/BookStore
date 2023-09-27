import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GiBookmarklet } from 'react-icons/gi';


const HomePage = ({ handle_Login_SignUp }) => {
    let [user, handleName] = useState('')
    let [password, handlePass] = useState('')
    let [register, handleRegister] = useState(false)
    let userLogin = useSelector(state => state.login)
    let isRegister = useSelector(state => state.isRegister)

    useEffect(() => {
        if (userLogin) {
            handleName('');
            handlePass('');
        }
        if (isRegister) {
            handleRegister(false)
        }
        else {
            handleName('');
            handlePass('');
        }
    }, [userLogin, isRegister])

    const logsign = (any) => {
        switch (any) {
            case 'login':
                handle_Login_SignUp({ any, userName: user, password })
                break;

            case 'signup':
                handle_Login_SignUp({ any, userName: user, password })
                handleRegister(true)
                break;
        }

    }
    return (<Container className='login-page' fluid>
        <Navbar className='login-navbar'>
            <Container>
                <GiBookmarklet className='bookBrand' />
            </Container>
        </Navbar>

        <Row className='intro-row m-2'>
            <Col className='intro-col text-center'>
                <h1>Welcome to BookLovers' Haven!</h1>
                <p>Discover a world of stories, knowledge, and inspiration.</p>
            </Col>
        </Row>

        <Row className='login-row'>
            <Col className='login-col' lg={6} md={8} sm={10} xs={10}>
                <input className='border rounded d-block text-center w-100' value={user} placeholder='username' onInput={(event) => handleName(event.target.value)} />
                <input className='border rounded d-block my-1 text-center w-100' value={password} type="password" placeholder='password' onInput={(event) => handlePass(event.target.value)} />
                <div className='text-center'> <button className='border rounded py-0' onClick={!register ? () => logsign('login') : () => logsign('signup')}>{!register ? "Login" : "signUp"}</button></div>
                <div className='text-white text-center'> {!register ? <>Dont have an account? <button className='border-0 bg-transparent text-white' onClick={() => handleRegister(true)}>signup</button></> : ''}</div>
            </Col>
        </Row>

        <Container fluid className='footer-container'>
            <Row>
                <Col className="text-center">
                    <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    </Container>)
}
export default HomePage;