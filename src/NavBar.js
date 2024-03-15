import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const NavBar = ({
    navbarRef,
    handleNavigate,
    setSearchInp,
    booksByGenre,
    clearSearch,
    searchBtnFunc,
    searchedBook,
    searchValue }) => {

    return (
        <nav ref={navbarRef} expand="lg" className='bookstore-nav'>
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
    )
}

export default NavBar