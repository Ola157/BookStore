import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GiBookmarklet } from 'react-icons/gi';
import { PiBackspace } from 'react-icons/pi';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const ViewMore = () => {
    let { bookId, userName } = useParams()
    let [foundBook, setFound] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const findBookId = async () => {
            try {
                let response = await axios.get(`https://book-store-back-end-three.vercel.app/store/viewmore/${bookId}`, {})
                let { foundBookDetails } = response.data
                setFound(foundBookDetails)
            }
            catch (err) {
                console.error(err)
            }
        }
        findBookId();
    }, [])

    return (<Container fluid className='page-container'>
        <Navbar expand="lg" className='custom-navbar px-4'>
            <Navbar.Brand href="/">
                <GiBookmarklet className='bookBrand' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavDropdown id="user-dropdown">
                        <NavDropdown.Header>{userName}</NavDropdown.Header>
                        <NavDropdown.Item onClick={() => navigate(`/myUploads/${userName}`)}>My Uploads</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => navigate(`/allbooks/${userName}`)} className='back-button'>
                    <><PiBackspace /> <span>Back</span></>
                </button>
            </Col>
        </Row>
        <Row className='book-details-container'>
            <Col className='book-details-card' lg={4}>

                <Col className='book-details-title'>
                    Book Details
                </Col>
                <hr className='divider'></hr>
                {foundBook &&
                    <div>
                        <Col className='book-detail-row'>
                            <span className='tag'>Author</span><span className='book-detail-value'>{foundBook.authorName}</span>
                        </Col>
                        <hr className='divider'></hr>
                        <Col className='book-detail-row'>
                            <span className='tag'>Title</span><span className='book-detail-value'>{foundBook.bookTitle}</span>
                        </Col>
                        <hr className='divider'></hr>
                        <Col className='book-detail-row'>
                            <span className='tag'>Description</span><span className='book-detail-value'>{foundBook.bookDescr}</span>
                        </Col>
                        <hr className='divider'></hr>
                        <Col className='book-detail-row'>
                            <span className='tag'>Pages</span><span className='book-detail-value'>{foundBook.bookpages}</span>
                        </Col>
                        <hr className='divider'></hr>
                        <Col className='book-detail-row'>
                            <span className='tag'>Genre</span><span className='book-detail-value'>{foundBook.bookGenre}</span>
                        </Col>
                        <hr className='divider'></hr>
                        <Col className='book-detail-row'>
                            <span className='tag'>Added by</span>  <span className='book-detail-value' style={{ fontStyle: 'italic' }}>{foundBook.username}</span>
                        </Col>
                    </div>
                }
            </Col>
        </Row>


        <Container fluid className='footer-container'>
            <Row>
                <Col className="text-center">
                    <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    </Container >)
}
export default ViewMore;