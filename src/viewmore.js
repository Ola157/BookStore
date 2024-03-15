import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { PiBackspace } from 'react-icons/pi';
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { TiStar } from "react-icons/ti";
import { GiWorld } from "react-icons/gi";
import { MdVerifiedUser } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialGooglePlus } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import NavBar from './NavBar';
import NavBottom from './NavBottom';
import useHCB from './custom_hook/useHCB';
import useCustomRef from './custom_hook/useCustomRef';
import ExpandableNav from './Expandable';
import useScrollEvent from './custom_hook/useScrollEvent';
import FooterPage from './Footer';


const ViewMore = ({
    getViewedBook,
    handleNavigate,
    handleClearSearch,
    handleSearch
}) => {

    const { bookId } = useParams()
    const searchedBook = useSelector(state => state.searchedBook)
    const allBooks = useSelector(state => state.allBooks)
    const viewedBook = useSelector(state => state.viewedBook)
    const [navbarRef, bookeryRef, menuRef, basketRef] = useCustomRef()

    // const [handleScroll] = useScrollEvent()

    const [activeCategory, handleFooterBtn] = useHCB()

    let [display, setAdd] = useState('description')
    let [searchValue, setSearchInp] = useState('')



    useEffect(() => {
        getViewedBook(bookId);
        let genreSection = document.querySelector('.genre-section');
        genreSection.classList.add('no-display-scroll');
    }, [])

    useEffect(() => {
        const bookstore_container = document.querySelector('.bookstore-container')
        if (activeCategory && activeCategory !== 'search') {
            bookstore_container.style.position = 'fixed'
        } else {
            bookstore_container.style.position = 'relative'
        }

    }, [activeCategory])

    // useEffect(() => {

    //     if (window.innerWidth < 768) {
    //         setProd(false)
    //     } else {
    //         setProd(true)
    //     }
    // }, [])

    const booksByGenre = [];

    allBooks.forEach(book => {
        if (!booksByGenre[book.genre]) {
            booksByGenre[book.genre] = [];
        }
        booksByGenre[book.genre].push(book);
    });

    const searchBtnFunc = () => {
        handleSearch(searchValue)
    }

    const clearSearch = () => {
        setSearchInp('')
        handleClearSearch()
    }

    const handleClicks = (type) => {
        setAdd((prev) => type == 'description' && window.innerWidth > 792 ? type : prev === type ? null : type)
    }

    return (<Container fluid className='bookstore-container'>
        <NavBottom handleFooterBtn={handleFooterBtn} activeCategory={activeCategory} />

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

        <section className='viewmore-content'>

            {viewedBook &&
                <div className='viewed-book-container'>
                    <div className='bookdetails-section'>
                        <div className='viewed-book-details'>
                            <h2>{viewedBook.title}</h2>
                            <p>A <b style={{ color: 'green' }}>Hardback</b> edition by {viewedBook.author} in English</p>
                        </div>


                        <div className='image-cost-section'>
                            <div className='viewed-book-image' >

                                <img alt={`Book Cover - ${viewedBook.title}`}
                                    src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/bookstore/${viewedBook.cover}`}
                                />

                            </div>

                            <div className='cost-section'>
                                <div className='cost-details'>
                                    <h2>
                                        <span>£7.99</span> <span>+ FREE delivery</span><br></br><span>RRP £8.99 <b>You save £1.00 (11%)</b></span>
                                    </h2>

                                    <p><span>You save</span> <span><b>11%</b></span> <span> off RRP!</span> </p>
                                </div>

                                <p style={{ fontWeight: 'bold', fontSize: '15px', letterSpacing: '-1.1px', color: '#004D40', margin: '0' }}>50+ available</p>


                                <div className='basket-wish'>

                                    <button className='viewmore-to-basket' data-name={`Add ${viewedBook.title} to your basket`}> <FaShoppingCart size={18} /> <span>Add to basket</span></button>
                                    <p><FaHeart size={18} color='red' /> <span>Add to wishlist</span></p>
                                </div>

                                <div className='syn-div'><GiWorld size={20} /><span>FREE delivery to United Kingdom</span></div>

                                <div className='syn-div'>
                                    <MdVerifiedUser size={20} />
                                    <span>Bookery has an Excellent rating of <b>4.7 on
                                        <TiStar className='mx-1 me-1 p-0' style={{ backgroundColor: 'green', color: 'white', borderRadius: '50%' }} size={15} />
                                        REVIEWS
                                    </b>
                                    </span>
                                </div>

                                <p className='description'><b>Short Description:</b> {viewedBook.description}</p>

                            </div>

                        </div>
                    </div>

                    <div className='bookrating-section'>
                        <div>
                            <span className='book-rating'>
                                <TiStar size={25} />
                                <TiStar size={25} />
                                <TiStar size={25} />
                                <TiStar size={25} />
                                <TiStar size={25} />
                            </span>
                            <span>
                                4.70 Average <br></br>
                                83717 Reviews
                            </span>
                            <span>  <TiStar size={20}
                                style={{ backgroundColor: 'black', color: 'white', borderRadius: '50%' }}
                            />REVIEWS.io</span>
                        </div>
                    </div>
                </div>
            }

            <div className='product-additions'>
                <div className='product-container'>
                    <ul className={`product-ul ${display == 'description' ? 'active' : ''}`}>

                        <li>
                            <button onClick={() => handleClicks('description')} className={display == 'description' ? 'active' : ''}>
                                Product Description   <span><MdAdd className='svgopen' /><RiSubtractFill className='svgclose' /></span>
                            </button>
                        </li>

                        <li className={`product-description ${display == 'description' ? 'active' : ''}`}>
                            <p>{viewedBook.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna odio, ultrices in hendrerit ac,
                                tristique et dolor. Cras elementum quam urna, ut pretium mauris pharetra ut. Duis a venenatis odio. Mauris metus nulla,
                                sagittis vitae pretium sit amet, consequat sit amet massa. Suspendisse potenti. Cras vitae elementum ligula.
                                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </p>
                        </li>
                    </ul>

                    <ul className={`product-ul ${display == 'detail' ? 'active' : ''}`}>
                        <li>
                            <button onClick={() => handleClicks('detail')} className={display == 'detail' ? 'active' : ''}>Details <span><MdAdd className='svgopen' /><RiSubtractFill className='svgclose' /></span></button>
                        </li>

                        <li className={`product-details ${display == 'detail' ? 'active' : ''}`}>

                            <p>
                                Author: {viewedBook.author}<br></br>
                                ISBN-13978152668<br></br>
                                ISBN-10163788X<br></br>
                                Format: Hardback,<br></br>
                                Publisher: Bloomabu Publishing PLC<br></br>
                                Publication date: 26 Oct 2021<br></br>
                                Interest Age: 9 - 11 years<br></br>
                                Product dimensions: 161 x 235 x 51mm<br></br>
                                Weight: 1,146g<br></br>
                                Condition: New<br></br>
                                Language: English
                            </p>
                            <p> Categories<br></br>
                                {viewedBook.genre}</p>
                        </li>
                    </ul>

                    <ul className={`product-ul ${display == 'review' ? 'active' : ''}`}>
                        <li>
                            <button onClick={() => handleClicks('review')} className={display == 'review' ? 'active' : ''}>Review this book <span><MdAdd className='svgopen' /><RiSubtractFill className='svgclose' /></span></button>
                        </li>

                        <li className={`product-review ${display == 'review' ? 'active' : ''}`}>
                            <p>
                                <label className='d-block'>Review rating</label>
                                <span className='book-rating'>
                                    <TiStar size={25} />
                                    <TiStar size={25} />
                                    <TiStar size={25} />
                                    <TiStar size={25} />
                                    <TiStar size={25} />
                                </span>
                                <label className='d-block'>Review text</label>
                                <textarea className='w-100'>

                                </textarea>
                                <span className='border-0 d-block'><button className='review-button'><FaArrowRight size={15} className='mx-2' /> <span>Submit using my account</span> </button> <button ><FaArrowRight size={15} className='mx-2' /><span>Submit as a guest</span></button></span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='product-description'>

                {display == 'description' &&
                    <div className='product-details'>
                        <span>
                            <h4>Product description</h4>
                            <p>{viewedBook.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna odio, ultrices in hendrerit ac,
                                tristique et dolor. Cras elementum quam urna, ut pretium mauris pharetra ut. Duis a venenatis odio. Mauris metus nulla,
                                sagittis vitae pretium sit amet, consequat sit amet massa. Suspendisse potenti. Cras vitae elementum ligula.
                                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </p>
                        </span>

                        <span>
                            <h4>Product Details</h4>
                            <p>
                                Author: {viewedBook.author}<br></br>
                                ISBN-13978152668<br></br>
                                ISBN-10163788X<br></br>
                                Format: Hardback,<br></br>
                                Publisher: Bloomabu Publishing PLC<br></br>
                                Publication date: 26 Oct 2021<br></br>
                                Interest Age: 9 - 11 years<br></br>
                                Product dimensions: 161 x 235 x 51mm<br></br>
                                Weight: 1,146g<br></br>
                                Condition: New<br></br>
                                Language: English
                            </p>
                            <p> Categories<br></br>
                                {viewedBook.genre}</p>
                        </span>
                    </div>
                }
                {display == 'review' &&
                    <div className='product-review'>
                        <h4>Write a Review</h4>
                        <label className='d-block'>Review rating</label>
                        <span className='book-rating'>
                            <TiStar size={25} />
                            <TiStar size={25} />
                            <TiStar size={25} />
                            <TiStar size={25} />
                            <TiStar size={25} />
                        </span>
                        <label className='d-block'>Review text</label>
                        <textarea className='w-100'>

                        </textarea>
                        <div><button><FaArrowRight size={15} className='mx-2' /> <span>Submit using my account</span> </button> <button><FaArrowRight size={15} className='mx-2' /><span>Submit as a guest</span></button></div>

                    </div>}
            </div>

            {viewedBook &&
                <div className='other-books'>
                    <h4>Other {viewedBook.genre} books you might like</h4>
                    <div className='book-gallery'>
                        {allBooks.length > 0 &&
                            allBooks.filter(gen => gen.genre == viewedBook.genre && gen.title != viewedBook.title).slice(0, 5).map((book, i) => (<div
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
                                    <button className='more-details' onClick={() => getViewedBook(book._id)}>more details</button>
                                </div>

                                <div className='book-rating'>
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                    <TiStar size={20} />
                                </div>

                                <button className='add-to-basket'> <FaShoppingCart size={18} /> <span>Add to basket</span></button>

                            </div>))}
                    </div>
                </div>}

        </section>

        <ExpandableNav activeCategory={activeCategory}
            menuRef={menuRef}
            booksByGenre={booksByGenre}
            basketRef={basketRef}
            bookeryRef={bookeryRef} />

        <FooterPage />
    </Container >)
}
export default ViewMore;