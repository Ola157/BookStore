import React from "react";
import { Link } from 'react-router-dom';
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialGooglePlus } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

const FooterPage = () => {
    return (
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
    )
}

export default FooterPage