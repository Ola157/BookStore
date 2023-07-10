import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllBooks from './allBooks';
import ViewMore from './viewmore';
import MyUploads from './myUploads';
import { useDispatch, useSelector } from 'react-redux';
import { handleAllSearch, handleBookAdd, handleDone, handleEdit, handleSignOut, handleSignupLogin } from './myRedux/myActions';
import useMultiple from './custom-hooks/useMultiple';

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

  const handleEditDone = (value) => {
    dispatch(handleDone(value))
  }

  const handleEditdelete = (any, id, myJwt) => {
    dispatch(handleEdit(any, id, myJwt))
  }

  const handle_Login_SignUp = (value) => {
    dispatch(handleSignupLogin(value))
  }

  const handleAddBook = (value) => {
    dispatch(handleBookAdd(value))
  }

  const handleLogout = () => {
    dispatch(handleSignOut())
  }

  const handleSearch = (bookName) => {
    dispatch(handleAllSearch(bookName))
  }


  return (
    <Routes>
      <Route path='/*' element={<HomePage handle_Login_SignUp={handle_Login_SignUp} />} />
      <Route path='/allbooks/:userName' element={<AllBooks handleLogout={handleLogout} handleSearch={handleSearch} />} />
      <Route path='/viewmore/:bookId/:userName' element={<ViewMore handleEditdelete={handleEditdelete} handleEditDone={handleEditDone} />} />
      <Route path='/myUploads/:userName' element={<MyUploads handleEditdelete={handleEditdelete} handleEditDone={handleEditDone} handleAddBook={handleAddBook} />} />
    </Routes>
  );
}

export default App;
