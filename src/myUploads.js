import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { GiBookmarklet } from 'react-icons/gi';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PiBackspace } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const MyUploads = ({
    handleAllChanges,
    handleAddBook,
    handleFetchUploads,
    handleLogout,
    handleNavigate,
    handleMessage }) => {

    const myUploads = useSelector(state => state.myUploads)
    const userName = useSelector(state => state.username)

    let [authorName, setAuthorName] = useState('')
    let [bookTitle, setBookTitle] = useState('')
    let [bookDescr, setBookDescr] = useState('')
    let [bookpages, setBookPages] = useState('')
    let [bookGenre, setBookGenre] = useState('')

    let [newAuthorName, setNewAuthorName] = useState('')
    let [newBookTitle, setNewBookTitle] = useState('')
    let [newBookDescr, setNewBookDescr] = useState('')
    let [newBookpages, setNewBookPages] = useState('')
    let [newBookGenre, setNewBookGenre] = useState('')
    let editBook = false

    useEffect(() => {
        handleFetchUploads();
    }, [])

    const handleUpload = () => {
        if (authorName && bookTitle && bookpages && bookDescr && bookGenre) {
            handleAddBook({ authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook })
            setBookTitle('')
            setAuthorName('')
            setBookPages('')
            setBookDescr('')
            setBookGenre('')
        }
        else { handleMessage({ message: 'Inputs Cant Be Blank' }) }
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
                const data = {
                    authorName: newAuthorName,
                    bookTitle: newBookTitle,
                    bookDescr: newBookDescr,
                    bookpages: newBookpages,
                    bookGenre: newBookGenre
                }
                handleAllChanges(type, bookId, data)
                break;
            case 'cancel':
                handleAllChanges(type, bookId)
                break;
        }
    }
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

        <Row className='uploads-row m-1'>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={authorName} onInput={(event) => setAuthorName(event.target.value)} placeholder='author name' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookTitle} onInput={(event) => setBookTitle(event.target.value)} placeholder='title' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookpages} onInput={(event) => setBookPages(event.target.value)} placeholder='page numbers' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookDescr} onInput={(event) => setBookDescr(event.target.value)} placeholder='book description' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={bookGenre} onInput={(event) => setBookGenre(event.target.value)} placeholder='genre' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12} className='text-center my-1'>
                <button className='border rounded w-50' onClick={() => handleUpload()}>Add</button>
            </Col>
        </Row>

        <Row className='back-row m-1'>
            <Col className='back-col'>
                <button onClick={() => handleNavigate(`/books`)} className='back-button'>
                    <><PiBackspace /> <span>Back</span></>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            {myUploads.length > 0 ?
                myUploads.map((book, i) =>
                    <Col lg={2} md={3} sm={3} xs={12} key={i} className='border rounded p-1 text-center m-1 bookUploads'>
                        <Col className='p-1'><span>{book.editBook === false ?
                            <>
                                <span className='tag'>Title</span>    {book.bookTitle}</> :
                            <input className='border rounded text-center' placeholder='title'
                                onInput={(event) => setNewBookTitle(event.target.value)} />}
                        </span>
                        </Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span className='tag'>Author:</span> <span>{book.editBook === false ?
                                book.authorName :
                                <input className='border rounded text-center' placeholder='name' onInput={(event) => setNewAuthorName(event.target.value)} />
                            }</span>
                        </Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span>{book.editBook === false ?
                                <><span className='tag'>pages </span>{book.bookpages} </> :
                                <input className='border rounded text-center' placeholder='page numbers' onInput={(event) => setNewBookPages(event.target.value)} />}
                            </span></Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span className='tag'>Genre</span>  <span>{book.editBook === false ?
                                book.bookGenre : <input className='border rounded text-center' placeholder='genre' onInput={(event) => setNewBookGenre(event.target.value)} />}
                            </span></Col>

                        <hr className='my-0'></hr>
                        <Col className='p-1'>
                            <span className='tag'>Description</span>  <span>{book.editBook === false ?
                                book.bookDescr : <input className='border rounded text-center' placeholder='description' onInput={(event) => setNewBookDescr(event.target.value)} />}
                            </span></Col>

                        <hr className='my-0'></hr>
                        {!book.editBook ?
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

        <footer className='footer-container'>
            <Row>
                <Col className="text-center">
                    <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
                </Col>
            </Row>
        </footer>
    </Container >
    )
}
export default MyUploads;