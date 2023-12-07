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
    const navbar = useRef()
    const bookerySec = useRef()
    const menuSec = useRef()
    const basketSec = useRef()
    let [isMenu, setMenu] = useState(false)
    let [isBasket, setBasket] = useState(false)
    let [isBookery, setMyBookery] = useState(false)
    let [isSearch, setSearch] = useState(false)
    let [isProd, setProd] = useState(true)
    let [isRev, setRev] = useState(false)
    let [searchValue, setSearchInp] = useState('')
    let [isDetail, setDetail] = useState(false)



    useEffect(() => {
        getViewedBook(bookId);
    }, [])

    useEffect(() => {

        window.addEventListener('scroll', handleScroll)

        return (() => {
            window.removeEventListener('scroll', handleScroll)
        })

    }, [])

    useEffect(() => {

        if (window.innerWidth < 768) {
            setProd(false)
        } else {
            setProd(true)
        }

        console.log(isProd)
    }, [window.innerWidth])

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

    const handleFooterBtn = (type) => {

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

    const handleProdAdds = (type) => {
        console.log('hi')
        if (window.innerWidth < 768) {
            switch (type) {
                case 'prod':
                    setProd(!isProd)
                    break;
                case 'rev':
                    setRev(!isRev)
                    break;
                case 'detail':
                    setDetail(!isDetail)
                    break;
            }
        }

        else {
            switch (type) {
                case 'prod':
                    setProd(true)
                    setRev(false)
                    break;
                case 'rev':
                    setProd(false)
                    setRev(true)
                    break;

            }
        }

    }

    return (<Container fluid className='bookstore-container'>
        <nav ref={navbar} expand="lg" className='bookstore-nav'>
            <section className='nav-brand-div' onClick={() => handleNavigate('/')}>
                <div>
                    <h2>Bookery</h2>
                    <p>Your Online Bookshop</p>
                </div>

                <div className='search-col'>
                    <input
                        // value={searchValue}
                        className='search-input'
                        type="text"
                        id='search'
                        placeholder='Search by title, author, keyword ....'
                    // onInput={(e) => setSearchInp(e.target.value)}
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
                                        onClick={() => getViewedBook(book._id)}
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
                    <div className='div-toggle'>

                        <button onClick={() => handleProdAdds('prod')} className={isProd ? 'active' : ''}>
                            Product Description   <span><MdAdd className='svgopen' /><RiSubtractFill className='svgclose' /></span>
                        </button>

                        <span className={`product-description${isProd ? 'active' : ''}`}>
                            <p>{viewedBook.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna odio, ultrices in hendrerit ac,
                                tristique et dolor. Cras elementum quam urna, ut pretium mauris pharetra ut. Duis a venenatis odio. Mauris metus nulla,
                                sagittis vitae pretium sit amet, consequat sit amet massa. Suspendisse potenti. Cras vitae elementum ligula.
                                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </p>
                        </span>
                    </div>

                    <div className='div-toggle'>
                        <button onClick={() => handleProdAdds('detail')} className={isDetail ? 'active' : ''}>Details <span><MdAdd className='svgopen' /><RiSubtractFill className='svgclose' /></span></button>

                        <span className={`product-details${isDetail ? 'active' : ''}`}>

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

                    <div className='div-toggle'>
                        <button onClick={() => handleProdAdds('rev')} className={isRev ? 'active' : ''}>Review this book <span><MdAdd className='svgopen' /><RiSubtractFill className='svgclose' /></span></button>

                        <span className={`product-review${isRev ? 'active' : ''}`}>
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
                            <div className='border-0'><button className='review-button'><FaArrowRight size={15} className='mx-2' /> <span>Submit using my account</span> </button> <button ><FaArrowRight size={15} className='mx-2' /><span>Submit as a guest</span></button></div>

                        </span>
                    </div>
                </div>
            </div>

            <div className='product-description'>

                {isProd && <div className='product-details'>
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
                {isRev &&
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
    </Container >)
}
export default ViewMore;