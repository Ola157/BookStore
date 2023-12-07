import React, { useState } from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { TiStar } from "react-icons/ti";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaTruck } from "react-icons/fa6";
import { GiBookPile } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialGooglePlus } from "react-icons/ti";


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

    let [isSearch, setSearch] = useState(false)
    let [isMenu, setMenu] = useState(false)
    let [isBasket, setBasket] = useState(false)
    let [isBookery, setMyBookery] = useState(false)
    let [searchValue, setSearchInp] = useState('')


    const navbar = useRef()
    const bookerySec = useRef()
    const menuSec = useRef()
    const basketSec = useRef()


    useEffect(() => {
        handleFetchBooks()
    }, [])

    useEffect(() => {

        window.addEventListener('scroll', handleScroll)

        return (() => {
            window.removeEventListener('scroll', handleScroll)
        })

    }, [])

    const booksByGenre = [];

    allBooks.forEach(book => {
        if (!booksByGenre[book.genre]) {
            booksByGenre[book.genre] = [];
        }
        booksByGenre[book.genre].push(book);
    });

    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
        let genreSection = document.getElementById('genre-section');
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            navbar.current.style.top = '0';
            genreSection.className = 'genre-section';
        } else {
            genreSection.className = 'no-display-scroll';
        }


        prevScrollPos = currentScrollPos;
    };

    const searchBtnFunc = () => {
        handleSearch(searchValue)
    }

    const clearSearch = () => {
        setSearchInp('')
        handleClearSearch()
    }

    const handleFooterBtn = async (type) => {

        switch (type) {
            case 'openmenu':

                setSearch(false)
                setBasket(false)
                setMyBookery(false)

                setTimeout(() => {
                    setMenu(true)
                }, 500)

                break;
            case 'closemenu':
                setMenu(false)

                break;

            case 'opensearch':
                setMenu(false)
                setBasket(false)
                setMyBookery(false)
                setSearch(true)

                break;
            case 'closesearch':
                setSearch(!isSearch)
                break;

            case 'openbasket':
                menuSec.current.className = 'menu'
                setMenu(false)
                setSearch(false)
                setMyBookery(false)

                setTimeout(() => {
                    setBasket(true)
                }, 500)
                break;

            case 'closebasket':

                setBasket(!isBasket)

                break;

            case 'openbookery':
                setMenu(false)
                setSearch(false)
                setBasket(false)

                setTimeout(() => {
                    setMyBookery(true)
                }, 500)
                break;

            case 'closebookery':
                setMyBookery(!isBookery)
                break;
        }
    }

    return (<Container fluid className='bookstore-container' >

        <section className='navbottom d-md-none'>

            <div className='navbottom-div'>

                <div>
                    <button onClick={() => handleFooterBtn('openmenu')}
                        className={isMenu ? 'active' : ''}
                    >
                        <GiHamburgerMenu size={18} />
                        <span>MENU</span>
                    </button>

                    <button onClick={() => handleFooterBtn('closemenu')}
                        className={isMenu ? 'active' : ''}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>
                </div>

                <div>
                    <button onClick={() => handleFooterBtn('opensearch')}
                        className={isSearch ? 'active' : ''}
                    >
                        <IoSearch size={18} />
                        <label htmlFor='search'> SEARCH</label>
                    </button>

                    <button onClick={() => handleFooterBtn('closesearch')}
                        className={isSearch ? 'active' : ''}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>
                </div>

                <div>
                    <button onClick={() => handleFooterBtn('openbasket')}
                        className={isBasket ? 'active' : ''}
                    >
                        <FaShoppingCart size={18} />
                        <span>BASKET</span>
                    </button>

                    <button onClick={() => handleFooterBtn('closebasket')}
                        className={isBasket ? 'active' : ''}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>

                </div>

                <div>
                    <button onClick={() => handleFooterBtn('openbookery')}
                        className={isBookery ? 'active' : ''}>
                        <FaBookOpen size={18} />
                        <span>MY BOOKERY</span>
                    </button>

                    <button onClick={() => handleFooterBtn('closebookery')}
                        className={isBookery ? 'active' : null}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>
                </div >
            </div>
        </section >


        <nav ref={navbar} expand="lg" className='bookstore-nav'>
            <section className='nav-brand-div' onClick={() => handleNavigate('/')}>
                <div>
                    <h2>Bookery</h2>
                    <p>Your Online Bookshop</p>
                </div>

                <div className='search-col'>
                    <input
                        value={searchValue}
                        className='search-input'
                        type="text"
                        id='search'
                        placeholder='Search by title, author, keyword....'
                        onInput={(e) => setSearchInp(e.target.value)}
                    />

                    {searchedBook && <button className='clear-search' onClick={clearSearch}>X</button>}
                    <button onClick={searchBtnFunc}>Search <IoSearch size={20} /></button>
                </div>

                <div className='icons'>
                    <span data-name='cart'>
                        <FaShoppingCart size={18} />
                        <sup>0</sup>
                    </span>
                    <span data-name='wishlist'>
                        <FaHeart size={18} />
                    </span>
                </div>
            </section>

            <section id='genre-section' className='genre-section'>
                <div className='dl'>
                    {Object.entries(booksByGenre).map(([genre, genreBooks]) => (
                        <dl key={genre} >
                            <dt>{genre}</dt>
                            <dd className={genreBooks.length > 10 ? 'scrolly' : null}>
                                {genreBooks.map(book => (
                                    <span
                                        onClick={() => handleNavigate(`/viewmore/${book._id}`)}
                                        key={book._id}
                                    >
                                        {book.title}
                                    </span>
                                ))}
                            </dd>
                        </dl>
                    ))}
                </div>
            </section>
        </nav>

        <Row className='message-row'>
            <Col className='message-col'>
                {message}
            </Col>
        </Row>

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

        <section className='footer-row'>
            <div className='footer-inner'>
                <ul className='sign-search'>
                    <li>You are not currently signed in.  <Link> Sign In</Link></li>
                    <li className='search-col'>
                        <input
                            // value={searchValue}
                            className='search-input'
                            type="text"
                            id='search'
                            placeholder='Search by title, author, keyword ....'
                        // onInput={(e) => setSearchInp(e.target.value)}
                        />
                        <button >Search <IoSearch size={20} /></button>
                    </li>
                </ul>
                <h3>Quick Finder</h3>

                <div className='footer-inner-bottom'>
                    <div className='site-map'>
                        <span>shop</span>
                        <ul>
                            <li>Best Sellers</li>
                            <li>New Releases</li>
                            <li>Reviews</li>
                            <li>Basket</li>
                            <li>Site Map</li>
                        </ul>

                        <span>Follow Bookery</span>
                        <ul className='socialsvg-ul'>
                            <li>
                                <TiSocialFacebook size={18} />
                            </li>

                            <li>
                                <FaXTwitter size={18} />
                            </li>

                            <li>
                                <IoLogoInstagram size={18} />
                            </li>

                            <li>
                                <TiSocialGooglePlus size={18} />
                            </li>

                        </ul>

                    </div>

                    <div className='about-div'>
                        <span>About Bookery</span>
                        <ul>
                            <li>Our Story</li>
                            <li>FAQ</li>
                            <li>Testimonials</li>
                            <li>Modern Slavery Statement</li>
                            <li>Gender Pay Gap Report</li>
                            <li>Business Services</li>
                        </ul>

                    </div>

                    <div className='help-contact'>
                        <span>Help & contact</span>
                        <ul>
                            <li>Delivery</li>
                            <li>Terms of Use</li>
                            <li>Terms of Sale</li>
                            <li>Returns</li>
                            <li>Privacy</li>
                            <li>Cookies</li>
                            <li>Cookies Settings</li>
                            <li>Push Notifications</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>

                    <div className='my-wordery'>
                        <span>My Wordery</span>
                        <ul>
                            <li>My Settings</li>
                            <li>My Addresses</li>
                            <li>My Orders</li>
                            <li>My Payment Options</li>
                            <li>My Badges</li>
                            <li>My Wishlist</li>
                            <li>My Reviews</li>
                            <li>Register</li>
                            <li>Forgotten Password</li>
                        </ul>
                    </div>

                    <div className='termsandconds'>
                        <span>RECEIVE NEWS, UPDATES AND SPECIAL OFFERS.</span>
                        <div>
                            <label htmlFor='email' className='d-block my-1'>Enter your email address here:</label>
                            <input id='email' type='email' />
                        </div>
                        <div className='d-flex align-items-center my-2'>
                            <input type='checkbox' className='me-3' id='confirm' />
                            <label htmlFor='confirm'>I confirm I would like to receive emails from wordery.com</label>
                        </div>
                        <div className='d-flex align-items-center my-2'>
                            <input type='checkbox' className='me-3' id='agree' />
                            <label htmlFor='agree'>I agree to terms & conditions</label>
                        </div>
                        <div>
                            <button>Subscribe</button>
                        </div>
                        <p><a>Click here to see our Ts & Cs</a> and our promise to protect your data.</p>
                    </div>
                </div>

                <p className='reserved-rights'>&copy; {new Date().getFullYear()} Bookery. All rights reserved.</p>
            </div >
        </section >


        <section className={`d-md-none ${!isMenu ? 'menu' : 'menu-section'}`} ref={menuSec}>
            <div>Menu</div>
            <div>Home</div>
            {Object.entries(booksByGenre).slice(0, 6).map(([genre, genreBooks]) => {
                let image = genreBooks.find((img) => img.cover)

                return (
                    <div key={genre} >

                        {genre}
                    </div>

                )
            })}
            <div>Book Chart</div>
            <div>About Us</div>
            <div>Help & Contact</div>
            <div>Blog</div>
            <div><FaHeart size={15} color='red' /> <span>My wishlist</span> </div>
        </section>

        <section className={`d-md-none ${!isBasket ? 'basket' : 'basket-section'}`} ref={basketSec}>
            <div>
                <button>View basket</button>
                <button>Continue shopping</button>
            </div>

            <div>
                <p>select currency</p>
                <select>
                    <option>£ - British pound</option>
                    <option>$ - US Dollar</option>
                    <option>$ - Australian Dollar</option>
                    <option>$ - Canadian Dollar</option>
                </select>
                <button>update</button>
            </div>
        </section>

        <section className={`d-md-none ${!isBookery ? 'bookery' : 'bookeryactive'}`} ref={bookerySec}>
            <div>
                <p>Sign in</p>
                <input placeholder='email' />
                <input placeholder='password' />
                <button>Sign in</button>
                <button>Register</button>
                <a>Forgotten your password?</a>
            </div>
        </section>



    </Container >
    )
}
export default BookStorePage;