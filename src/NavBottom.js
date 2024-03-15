import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
const NavBottom = ({ handleFooterBtn, activeCategory }) => {

    return (
        <section className='navbottom d-md-none'>

            <div className='navbottom-div'>

                <div>
                    <button onClick={() => handleFooterBtn('menu')}
                        className={activeCategory === 'menu' ? 'active' : ''}
                    >
                        <GiHamburgerMenu size={18} />
                        <span>MENU</span>
                    </button>

                    <button onClick={() => handleFooterBtn('menu')}
                        className={activeCategory === 'menu' ? 'active' : ''}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>
                </div>

                <div>
                    <button onClick={() => handleFooterBtn('search')}
                        className={activeCategory === 'search' ? 'active' : ''}
                    >
                        <IoSearch size={18} />
                        <label htmlFor='search'> SEARCH</label>
                    </button>

                    <button onClick={() => handleFooterBtn('search')}
                        className={activeCategory === 'search' ? 'active' : ''}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>
                </div>

                <div>
                    <button onClick={() => handleFooterBtn('basket')}
                        className={activeCategory === 'basket' ? 'active' : ''}
                    >
                        <FaShoppingCart size={18} />
                        <span>BASKET</span>
                    </button>

                    <button onClick={() => handleFooterBtn('basket')}
                        className={activeCategory === 'basket' ? 'active' : ''}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>

                </div>

                <div>
                    <button onClick={() => handleFooterBtn('bookery')}
                        className={activeCategory === 'bookery' ? 'active' : ''}>
                        <FaBookOpen size={18} />
                        <span>MY BOOKERY</span>
                    </button>

                    <button onClick={() => handleFooterBtn('bookery')}
                        className={activeCategory === 'bookery' ? 'active' : ''}
                    >
                        <CgClose size={18} />
                        <span>CLOSE</span>
                    </button>
                </div >
            </div>
        </section >
    )
}

export default NavBottom