import React from "react";
import { FaHeart } from "react-icons/fa";

const ExpandableNav = ({
    activeCategory,
    menuSec,
    booksByGenre,
    basketSec,
    bookerySec,
}) => {

    return (
        <>
            <section className={`d-md-none menu ${activeCategory === 'menu' ? 'active' : ''}`} ref={menuSec}>
                <div>
                    <div className="menu_listFirst">Menu</div>
                    <div className="menu_list">Home</div>
                    {Object.entries(booksByGenre).slice(0, 6).map(([genre, genreBooks]) => {
                        // let image = genreBooks.find((img) => img.cover)
                        return (
                            <div className="menu_list" key={genre} >
                                {genre}
                            </div>

                        )
                    })}
                    <div className="menu_list">Book Chart</div>
                    <div className="menu_list">About Us</div>
                    <div className="menu_list">Help & Contact</div>
                    <div className="menu_list">Blog</div>
                    <div className="menu_list"><FaHeart size={15} color='red' /> <span>My wishlist</span> </div>
                </div>

            </section>

            <section className={`d-md-none basket ${activeCategory === 'basket' ? 'active' : ''}`} ref={basketSec}>
                <div>
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
                </div>
            </section>

            <section className={`d-md-none bookery ${activeCategory === 'bookery' ? 'active' : ''}`} ref={bookerySec}>
                <div>
                    <div>
                        <p>Sign in</p>
                        <input placeholder='email' />
                        <input placeholder='password' />
                        <button>Sign in</button>
                        <button>Register</button>
                        <a>Forgotten your password?</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ExpandableNav