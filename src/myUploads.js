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

    const myUploads = useSelector(state => state.userUploads)
    const userName = useSelector(state => state.username)

    let [author, setAuthor] = useState('')
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [genre, setGenre] = useState('')
    let [image, setImage] = useState('')

    useEffect(() => {
        handleFetchUploads();
    }, [])

    const handleImage = e => {
        setImage(e.target.files[0])
    }

    const handleUpload = () => {
        if (author && title && description && genre) {
            handleAddBook({ author, title, cover: image, genre, description })
            setTitle('')
            setAuthor('')
            setDescription('')
            setGenre('')
            setImage('')
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
                    author,
                    title,
                    description,
                    genre,
                    cover: image
                }
                if (!data) return
                setTitle('')
                setAuthor('')
                setDescription('')
                setGenre('')
                setImage('')
                handleAllChanges(type, bookId, data)
                break;
            case 'cancel':
                handleAllChanges(type, bookId)
                break;
        }
    }

    console.log(myUploads)
    return (<Container fluid className='bookstore-container'>

        <nav expand="lg" className='bookstore-nav'>
            <span onClick={() => handleNavigate('/')} className='span-brand'>
                <GiBookmarklet size={24} /> <h2 className='d-inline'>BookLover</h2>
            </span>

            {/* <div>
                <button onClick={() => handleNavigate('/myuploads')}></button>
                <button onClick={handleLogout}></button>

            </div> */}
            <div></div>
        </nav>

        <Row className='bookupload-row'>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='text-center w-100' value={title} onInput={(event) => setTitle(event.target.value)} placeholder='Title' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='text-center w-100' value={author} onInput={(event) => setAuthor(event.target.value)} placeholder='Author' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='text-center w-100' value={description} onInput={(event) => setDescription(event.target.value)} placeholder='Description' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <select className='text-center w-100'
                    value={genre} onInput={(event) => setGenre(event.target.value)}>
                    <option>Genre</option>
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Biography'>Biography</option>
                    <option value='Fiction'>Fiction</option>
                    <option value='Fantasy'>Fantasy</option>
                    <option value='Horror'>Horror</option>
                    <option value='Mystery'>Mystery</option>
                    <option value='Non-Fiction'>Non-Fiction</option>
                    <option value='Literature'>Literature</option>
                    <option value='Romance'>Romance</option>
                    <option value='Thriller'>Thriller</option>
                </select>
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <label htmlFor='image'>{!image.name ? 'Select Image' : image.name}</label>
                <input className='d-none' type='file' id='image' onChange={handleImage} />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12} className='text-center'>
                <button onClick={() => handleUpload()}>Add</button>
            </Col>
        </Row>

        <Row className='return-row m-0'>
            <button onClick={() => handleNavigate(`/`)} >
                <PiBackspace size={20} /> <span>Back</span>
            </button>
        </Row>

        <section className='myuploads-row'>

            {myUploads.length > 0 ?
                myUploads.map((book, i) => (
                    <div key={i} className='mybookUploads-section'>

                        {book.edit === false ?
                            <img src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/bookstore/${book.cover}`} /> :
                            <span>
                                <label htmlFor='image'>{!image.name ? 'Select Image' : image.name}</label>
                                <input className='d-none' type='file' name='image' onChange={handleImage} />
                            </span>
                        }

                        <span className='p-1'>
                            {book.edit === false ?
                                <span className='tag'> {book.title}</span> :
                                <input className='text-center' placeholder='Title' value={title}
                                    onInput={(event) => setTitle(event.target.value)} />}
                        </span>

                        <span className='p-1'>
                            {book.edit === false ?
                                <span className='tag'>  {book.author} </span> :
                                <input className='text-center' placeholder='Author' value={author}
                                    onInput={(event) => setAuthor(event.target.value)} />
                            }
                        </span>

                        <span className='p-1'>
                            {book.edit === false ?
                                <span className='tag'>{book.genre}</span> :
                                <select className='text-center w-100'
                                    value={genre} onInput={(event) => setGenre(event.target.value)}>
                                    <option>Genre</option>
                                    <option value='Action'>Action</option>
                                    <option value='Adventure'>Adventure</option>
                                    <option value='Biography'>Biography</option>
                                    <option value='Fiction'>Fiction</option>
                                    <option value='Fantasy'>Fantasy</option>
                                    <option value='Horror'>Horror</option>
                                    <option value='Mystery'>Mystery</option>
                                    <option value='Non-Fiction'>Non-Fiction</option>
                                    <option value='Literature'>Literature</option>
                                    <option value='Romance'>Romance</option>
                                    <option value='Thriller'>Thriller</option>
                                </select>}
                        </span>

                        <span className='p-1'>
                            {book.edit === false ?
                                <span className='tag'>{book.description}</span> :
                                <input className='text-center' placeholder='Description' value={description}
                                    onInput={(event) => setDescription(event.target.value)} />}
                        </span>

                        {!book.edit ?
                            <span className='btn-col'>
                                <button className='btn-edit'
                                    onClick={() => handleChanges('edit', book._id)}>Edit
                                </button>
                                <button className='btn-delete' onClick={() => handleChanges('delete', book._id)}>Delete</button>
                            </span>
                            :
                            <span className='btn-col'>
                                <button className='btn-save'
                                    onClick={() => handleChanges('save', book._id)}> Save
                                </button>
                                <button className='btn-cancel'
                                    onClick={() => handleChanges('cancel', book._id)}>Cancel</button>
                            </span>
                        }
                    </div>))
                :
                <Col lg={4} md={4} sm={12} xs={12} className='bg-white p-1 text-center m-1 bg-white'> User Added No Books Yet</Col>
            }
        </section>

        <Row className='footer-row'>
            <Col className="text-center">
                <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
            </Col>
        </Row>
    </Container >
    )
}
export default MyUploads;