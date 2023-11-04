import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GiBookmarklet } from 'react-icons/gi';
import { PiBackspace } from 'react-icons/pi';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';

const ViewMore = ({
    getViewedBook,
    handleNavigate
}) => {

    const { bookId } = useParams()
    const userName = useSelector(state => state.username)
    const viewedBook = useSelector(state => state.viewedBook)


    useEffect(() => {
        getViewedBook(bookId);
    }, [])

    return (<Container fluid className='bookstore-container'>
        <Navbar expand="lg">
            <Navbar.Brand onClick={() => handleNavigate(`/books`)}>
                <GiBookmarklet className='bookBrand' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavDropdown id="user-dropdown">
                        <NavDropdown.Header>{userName}</NavDropdown.Header>
                        <NavDropdown.Item onClick={() => handleNavigate(`/myUploads`)}>My Uploads</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Row className='back-row m-1'>
            <Col className='back-col'>
                <button onClick={() => handleNavigate(`/books`)} className='back-button'>
                    <><PiBackspace /> <span>Back</span></>
                </button>
            </Col>
        </Row>
        <Row className='book-details-container m-1'>
            <Col className='book-details-card' lg={6} md={9} sm={10} xs={10}>

                <Col className='book-details-title'>
                    Book Details
                </Col>
                <hr className='divider'></hr>
                {viewedBook &&
                    <Col >
                        <div className='book-detail-row'>
                            <span className='tag'>Author</span><span className='book-detail-value'>{viewedBook.authorName}</span>
                        </div>
                        <hr className='divider'></hr>
                        <div className='book-detail-row'>
                            <span className='tag'>Title</span><span className='book-detail-value'>{viewedBook.bookTitle}</span>
                        </div>
                        <hr className='divider'></hr>
                        <div className='book-detail-row'>
                            <span className='tag'>Description</span><span className='book-detail-value'>{viewedBook.bookDescr}</span>
                        </div>
                        <hr className='divider'></hr>
                        <div className='book-detail-row'>
                            <span className='tag'>Pages</span><span className='book-detail-value'>{viewedBook.bookpages}</span>
                        </div>
                        <hr className='divider'></hr>
                        <div className='book-detail-row'>
                            <span className='tag'>Genre</span><span className='book-detail-value'>{viewedBook.bookGenre}</span>
                        </div>
                        <hr className='divider'></hr>
                        <div className='book-detail-row'>
                            <span className='tag'>Added by</span>  <span className='book-detail-value' style={{ fontStyle: 'italic' }}>{viewedBook.username}</span>
                        </div>
                    </Col>}
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
export default ViewMore;