import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { TiStar } from "react-icons/ti";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaTruck } from "react-icons/fa6";
import { GiBookPile } from "react-icons/gi";

import NavBottom from './NavBottom';
import ExpandableNav from './Expandable';
import useHCB from './custom_hook/useHCB';
import useCustomRef from './custom_hook/useCustomRef';
import useScrollEvent from './custom_hook/useScrollEvent';
import NavBar from './NavBar';
import FooterPage from './Footer';


const BookStorePage = ({
    handleSearch,
    handleLogout,
    handleNavigate,
    handleFetchBooks,
    handleClearSearch }) => {

    const userName = useSelector(state => state.username)
    const searchedBook = useSelector(state => state.searchedBook)
    const allBooks = useSelector(state => state.allBooks)
    const message = useSelector(state => state.message)
    const isLogged = useSelector(state => state.isLogged)

    let [searchValue, setSearchInp] = useState('')

    const [activeCategory, handleFooterBtn] = useHCB()
    const [navbarRef, bookeryRef, menuRef, basketRef] = useCustomRef()

    useEffect(() => {
        const bookstore_container = document.querySelector('.bookstore-container')
        if (activeCategory && activeCategory !== 'search') {
            bookstore_container.style.position = 'fixed'
        } else {
            bookstore_container.style.position = 'relative'
        }

    }, [activeCategory])


    useEffect(() => {
        const bookstoreBody = document.querySelector('.bookstoreBody')

        const handleCloseNavs = () => {
            handleFooterBtn(null)
        }

        bookstoreBody.addEventListener('click', handleCloseNavs)
        return () => {
            bookstoreBody.removeEventListener('click', handleCloseNavs)
        }
    }, [])


    useEffect(() => {
        handleFetchBooks()
    }, [])


    useEffect(() => {

        window.addEventListener('scroll', handleScroll)

        return (() => {
            window.removeEventListener('scroll', handleScroll)
        })

    }, [])

    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
        let genreSection = document.querySelector('.genre-section');
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos && navbarRef) {
            navbarRef.current.style.top = '0';
            genreSection.classList.remove('no-display-scroll');
        } else {
            genreSection.classList.add('no-display-scroll');
        }


        prevScrollPos = currentScrollPos;
    };


    const booksByGenre = [];

    allBooks.forEach(book => {
        if (!booksByGenre[book.genre]) {
            booksByGenre[book.genre] = [];
        }
        booksByGenre[book.genre].push(book);
    });




    const searchBtnFunc = () => {
        // handleSearch(searchValue)
    }

    const clearSearch = () => {
        setSearchInp('')
        handleClearSearch()
    }



    return (<Container fluid className='bookstore-container' >

        <NavBottom handleFooterBtn={handleFooterBtn} activeCategory={activeCategory} />

        <div className='bookstoreBody'>
            <NavBar
                handleNavigate={handleNavigate}
                booksByGenre={booksByGenre}
                setSearchInp={setSearchInp}
                navbarRef={navbarRef}
                clearSearch={clearSearch}
                searchBtnFunc={searchBtnFunc}
                searchedBook={searchedBook}
                searchValue={searchValue}
            />


            {/* <Row className='message-row'>
                <Col className='message-col'>
                    {message}
                </Col>
            </Row> */}

            <div className='main-content-div'>
                <section className='book-gallery'>
                    {allBooks.length > 0 && !searchedBook &&
                        allBooks.map((book, i) => {

                            return (<div
                                lg={2} md={3} sm={5} xs={10} key={i}
                                className='book-container'
                            >
                                <img alt={`Book Cover - ${book.title}`}
                                    src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/bookstore/${book.cover}`}
                                    className='book-image' />

                                <div className="book-info"
                                >
                                    <h4>{book.title}</h4>
                                    <p>{book.author}</p>
                                    <button className='more-details' onClick={() => handleNavigate(`/viewmore/${book._id}`)}>more details</button>
                                </div>

                                <div className='book-rating'>
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                </div>

                                <button className='add-to-basket'> <FaShoppingCart size={18} /> <span>Add to basket</span></button>

                            </div>)
                        })}
                </section>

                {searchedBook &&
                    <section className='d-flex justify-content-center search-section'>
                        <div
                            lg={2} md={3} sm={5} xs={10}
                            className='book-container'
                        >
                            <img alt={`Book Cover - ${searchedBook.title}`}
                                src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/bookstore/${searchedBook.cover}`}
                                className='book-image' />

                            <div className="book-info"
                            >
                                <h4>{searchedBook.title}</h4>
                                <p>{searchedBook.author}</p>
                                <button className='more-details' onClick={() => handleNavigate(`/viewmore/${searchedBook._id}`)}>more details</button>
                            </div>

                            <div className='book-rating'>
                                <TiStar size={20} />
                                <TiStar size={20} />
                                <TiStar size={20} />
                                <TiStar size={20} />
                                <TiStar size={20} />
                            </div>

                            <button className='add-to-basket'> <FaShoppingCart size={18} /> <span>Add to basket</span></button>

                        </div>
                    </section>}

                <section className='genre-container'>
                    <ul>

                        {Object.entries(booksByGenre).slice(0, 6).map(([genre, genreBooks]) => {
                            let image = genreBooks.find((img) => img.cover)

                            return (
                                <li key={genre}>

                                    <div>
                                        <img
                                            src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/bookstore/${image.cover}`}
                                            alt={image.title} />
                                    </div>

                                    <div> <span>{genre}</span> <span><MdOutlineKeyboardArrowRight size={20} /></span></div>

                                </li>

                            )
                        })}

                    </ul>
                </section>

                <section className='books-usps'>
                    <div>
                        <ul>
                            <li>
                                <span><FaTruck size={50} /></span>
                                <p>
                                    <span><b>Free</b> worldwide <b>delivery</b></span> <br></br>
                                    available with every order
                                </p>
                            </li>
                            <li>
                                <span><GiBookPile size={50} /></span>
                                <p>
                                    <span>Over <b>10 million</b></span><br></br>
                                    books available online
                                </p>
                            </li>

                            <li>
                                <span><TiStar size={50} /></span>
                                <p>
                                    <span>7,000+ <b>5 star reviews</b></span><br></br>
                                    on <span><TiStar className='mb-1' size={15} style={{ backgroundColor: 'green', color: 'white', borderRadius: '50%' }} /></span> REVIEWS
                                </p>
                            </li>

                        </ul>
                    </div>
                </section>

            </div >

            <FooterPage />

        </div>

        <ExpandableNav activeCategory={activeCategory}
            menuRef={menuRef}
            booksByGenre={booksByGenre}
            basketRef={basketRef}
            bookeryRef={bookeryRef} />

    </Container >
    )
}
export default BookStorePage;