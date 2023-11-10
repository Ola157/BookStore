import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GiBookmarklet } from 'react-icons/gi';


const HomePage = ({
    handleAuthentication,
    handleIsRegister,
    handleNavigate
}) => {

    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    const isLogged = useSelector(state => state.isLogged)
    const isRegister = useSelector(state => state.isRegister)
    const message = useSelector(state => state.message)

    useEffect(() => {
        if (isLogged) {
            return handleNavigate('/books')
        }
    }, [isLogged])

    const handleAuth = (type) => {
        switch (type) {
            case 'login':
                handleAuthentication({ type, userName: userName, password })
                setUserName('')
                setPassword('')
                break;
            case 'signup':
                handleAuthentication({ type, userName: userName, password })
                setUserName('')
                setPassword('')
                break;
        }

    }

    return (<Container className='bookstore-container' fluid>
        <Navbar>
            <div>
                <GiBookmarklet className='bookBrand' />
            </div>
        </Navbar>

        <Row className='py-2 justify-content-center m-0'>
            <Col lg={12} md={12} sm={12} xs={12}
                className='introduction-col text-center'>
                <h1>Welcome to BookLovers' Haven!</h1>
                <p>Discover a world of stories, knowledge, and inspiration.</p>
            </Col>
        </Row>
        {message}
        <Row className='message-row'>
            <Col className='message-col'>
                {message}
            </Col>
        </Row>

        <Row className='authentication-row'>
            <Col className='authentication-col' lg={6} md={8} sm={10} xs={10}>
                <input className='border rounded d-block m-1 text-center w-100' value={userName} placeholder='username'
                    onInput={(event) => setUserName(event.target.value)} />
                <input className='border rounded d-block m-1 text-center w-100' value={password} type="password" placeholder='password'
                    onInput={(event) => setPassword(event.target.value)} />
                <div className='text-center'>
                    <button
                        onClick={!isRegister ?
                            () => handleAuth('login')
                            : () => handleAuth('signup')}>
                        {!isRegister ? "login" : "sign up"}
                    </button>
                </div>
                <div className='text-white text-center'>
                    {!isRegister ?
                        <>Dont have an account?
                            <button className='border-0'
                                onClick={() => handleIsRegister(true)}>signup
                            </button>
                        </> :
                        <>
                            Existing User?
                            <button className='border-0'
                                onClick={() => handleIsRegister(false)}>login
                            </button>
                        </>
                    }
                </div>
            </Col>
        </Row>

        <footer className='footer-container'>
            <Row>
                <Col className="text-center">
                    <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
                </Col>
            </Row>
        </footer>
    </Container >)
}
export default HomePage;