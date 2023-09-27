import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllBooks from './allBooks';
import ViewMore from './viewmore';
import MyUploads from './myUploads';
import { useDispatch, useSelector } from 'react-redux';
import { handleAllSearch, handleBookAdd, handleSignOut, handleSignupLogin, handleUserUploads, handleChanges, handleSearchedBook } from './myRedux/myActions';

function App() {
  let userLogin = useSelector(state => state.username)
  let dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin) {
      navigate(`/allbooks/${userLogin}`)
    }
    if (userLogin === '') {
      navigate('/')
    }
  }, [userLogin])

  const handleAllChanges = (type, bookId, data) => {
    dispatch(handleChanges(type, bookId, data))
  }

  const handle_Login_SignUp = (data) => {
    dispatch(handleSignupLogin(data))
  }

  const handleAddBook = (data) => {
    dispatch(handleBookAdd(data))
  }

  const handleLogout = () => {
    dispatch(handleSignOut())
  }

  const handleSearch = (bookTitle) => {
    setTimeout(() => {
      dispatch(handleAllSearch(bookTitle));
    }, 2000);
  }

  const handleAllUserUploads = () => {
    dispatch(handleUserUploads())
  }

  const handleSearched = () => {
    dispatch(handleSearchedBook())
  }



  return (
    <Routes>
      <Route path='/*' element={<HomePage handle_Login_SignUp={handle_Login_SignUp} />} />
      <Route path='/allbooks/:userName' element={<AllBooks handleSearched={handleSearched} handleLogout={handleLogout} handleSearch={handleSearch} handleAllChanges={handleAllChanges} />} />
      <Route path='/viewmore/:bookId/:userName' element={<ViewMore handleAllChanges={handleAllChanges} />} />
      <Route path='/myUploads/:userName' element={<MyUploads handleLogout={handleLogout} handleAllChanges={handleAllChanges} handleAddBook={handleAddBook} handleAllUserUploads={handleAllUserUploads} />} />
    </Routes>
  );
}

export default App;
