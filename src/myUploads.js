import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { GiBookmarklet } from 'react-icons/gi';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PiBackspace } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const MyUploads = ({ handleAllChanges, handleAddBook, handleAllUserUploads, handleLogout }) => {
    const { userName } = useParams()
    const navigate = useNavigate()
    let myUploads = useSelector(state => state.myUploads)
    let [authorName, handleAuthorName] = useState('')
    let [bookTitle, handleBookTitle] = useState('')
    let [bookDescr, handleBookDescr] = useState('')
    let [bookpages, handleBookPages] = useState('')
    let [bookGenre, handleBookGenre] = useState('')

    let [newAuthorName, handleNewAuthorName] = useState('')
    let [newBookTitle, handleNewBookTitle] = useState('')
    let [newBookDescr, handleNewBookDescr] = useState('')
    let [newBookpages, handleNewBookPages] = useState('')
    let [newBookGenre, handleNewBookGenre] = useState('')
    let editBook = false
    let isLogin = useSelector(state => state.isLogin)

    useEffect(() => {
        if (isLogin) {
            return handleAllUserUploads();
        }
        else { return navigate('/') }
    }, [myUploads, isLogin])

    const handleUpload = () => {
        if (authorName !== '' && bookTitle !== '' && bookpages !== '' && bookDescr !== '' && bookGenre !== '') {
            handleAddBook({ authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook })
            handleBookTitle('')
            handleAuthorName('')
            handleBookPages('')
            handleBookDescr('')
            handleBookGenre('')
        }
        else { alert('Inputs Cant Be Blank') }
    }

    const handleChanges = (type, bookId) => {
        switch (type) {
            case 'edit':
                handleAllChanges(type, bookId)
                break;
            case 'delete':
                handleAllChanges(type, bookId)
                break;
            case 'save':
                let data = { authorName: newAuthorName, bookTitle: newBookTitle, bookDescr: newBookDescr, bookpages: newBookpages, bookGenre: newBookGenre }
                handleAllChanges(type, bookId, data)
                break;
            case 'cancel':
                handleAllChanges(type, bookId)
                break;
        }
    }
    return (<Container fluid className='page-container'>
        <Navbar expand="lg" className='custom-navbar px-4'>
            <Navbar.Brand href="#">
                <GiBookmarklet className='bookBrand' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavDropdown id="user-dropdown">
                        <NavDropdown.Header>{userName}</NavDropdown.Header>
                        <NavDropdown.Item onClick={() => navigate(`/myUploads/${userName}`)}>My Uploads</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Row className='uploads-row'>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={authorName} onInput={(event) => handleAuthorName(event.target.value)} placeholder='author name' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookTitle} onInput={(event) => handleBookTitle(event.target.value)} placeholder='title' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookpages} onInput={(event) => handleBookPages(event.target.value)} placeholder='page numbers' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookDescr} onInput={(event) => handleBookDescr(event.target.value)} placeholder='book description' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookGenre} onInput={(event) => handleBookGenre(event.target.value)} placeholder='genre' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12} className='text-center my-1'>
                <button className='border rounded w-50' onClick={() => handleUpload()}>Add</button>
            </Col>
        </Row>

        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => navigate(`/allbooks/${userName}`)} className='back-button'>
                    <><PiBackspace /> <span>Back</span></>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center'>
            {myUploads.length ?
                myUploads.map((book, i) =>
                    <Col lg={2} md={3} sm={3} xs={12} key={i} className='border rounded p-1 text-center m-1 bookUploads'>
                        <Col className='p-1'><span>{book.editBook === false ?
                            <><span className='tag'>Title</span>    book.bookTitle</> :
                            <input className='border rounded text-center' placeholder='title' onInput={(event) => handleNewBookTitle(event.target.value)} />
                        }</span>
                        </Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span className='tag'>Author:</span> <span>{book.editBook === false ?
                                book.authorName :
                                <input className='border rounded text-center' placeholder='name' onInput={(event) => handleNewAuthorName(event.target.value)} />
                            }</span>
                        </Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span>{book.editBook === false ?
                                <><span className='tag'>pages </span>{book.bookpages} </> :
                                <input className='border rounded text-center' placeholder='page numbers' onInput={(event) => handleNewBookPages(event.target.value)} />}
                            </span></Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span className='tag'>Genre</span>  <span>{book.editBook === false ?
                                book.bookGenre : <input className='border rounded text-center' placeholder='genre' onInput={(event) => handleNewBookGenre(event.target.value)} />}
                            </span></Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span className='tag'>Description</span>  <span>{book.editBook === false ?
                                book.bookDescr : <input className='border rounded text-center' placeholder='description' onInput={(event) => handleNewBookDescr(event.target.value)} />}
                            </span></Col>

                        <hr className='my-0'></hr>
                        {book.editBook === false ?
                            <Col className='text-center m-1'>
                                <button className='btn-edit'
                                    onClick={() => handleChanges('edit', book._id)}>Edit
                                </button>
                                <button className='btn-delete' onClick={() => handleChanges('delete', book._id)}>Delete</button>
                            </Col>
                            :
                            <Col className='text-center m-1'>
                                <button className='btn-save'
                                    onClick={() => handleChanges('save', book._id)}> Save Changes
                                </button>
                                <button className='btn-cancel'
                                    onClick={() => handleChanges('cancel', book._id)}>Cancel</button>
                            </Col>}
                    </Col>)
                :
                <Col lg={4} md={4} sm={12} xs={12} className='bg-white border rounded p-1 text-center m-1 bg-white'> User Added No Books Yet</Col>
            }
        </Row>

        <Container fluid className='footer-container'>
            <Row>
                <Col className="text-center">
                    <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    </Container >
    )
}
export default MyUploads;