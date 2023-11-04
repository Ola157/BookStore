import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewMore from './viewmore';
import MyUploads from './myUploads';
import { useDispatch } from 'react-redux';
import {
  handleAllSearch,
  handleBookAdd,
  handleSignOut,
  handleUserUploads,
  handleChanges,
  handleAuth,
  handleRegister,
  handleGetAllBooks,
  handleNewMessage,
  handleViewedBook
} from './myRedux/myActions';
import BookStorePage from './bookStorePage';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthentication = (data) => {
    dispatch(handleAuth(data))
  }

  const handleAddBook = (data) => {
    dispatch(handleBookAdd(data))
    setTimeout(() => {
      handleFetchUploads()
    }, 1000)
  }

  const handleSearch = (bookTitle) => {
    setTimeout(() => {
      dispatch(handleAllSearch(bookTitle));
    }, 2000);
  }

  const handleFetchUploads = () => {
    dispatch(handleUserUploads())
  }

  const handleAllChanges = (type, bookId, data) => {
    dispatch(handleChanges(type, bookId, data))
    setTimeout(() => {
      handleFetchUploads()
    }, 1000)
  }

  const handleIsRegister = (value) => {
    dispatch(handleRegister(value))
  }

  const handleFetchBooks = () => {
    dispatch(handleGetAllBooks())
  }

  const getViewedBook = (bookId) => {
    dispatch(handleViewedBook(bookId))
  }

  const handleMessage = (message) => {
    dispatch(handleNewMessage(message))
  }

  const handleNavigate = (page) => {
    navigate(page)
  }

  const handleLogout = () => {
    dispatch(handleSignOut())
    localStorage.removeItem('accessToken')
    handleNavigate('/')
  }


  return (
    <Routes>
      <Route path='/*' element={<HomePage
        handleAuthentication={handleAuthentication}
        handleIsRegister={handleIsRegister}
        handleNavigate={handleNavigate} />} />

      <Route path='/books' element={<BookStorePage
        handleFetchBooks={handleFetchBooks}
        handleLogout={handleLogout}
        handleNavigate={handleNavigate}
        handleSearch={handleSearch} />} />

      <Route path='/viewmore/:bookId' element={<ViewMore
        getViewedBook={getViewedBook}
        handleNavigate={handleNavigate}

      />} />
      <Route path='/myuploads' element={<MyUploads
        handleNavigate={handleNavigate}
        handleLogout={handleLogout}
        handleAllChanges={handleAllChanges}
        handleAddBook={handleAddBook}
        handleFetchUploads={handleFetchUploads}
        handleMessage={handleMessage} />} />
    </Routes>
  );
}

export default App;
