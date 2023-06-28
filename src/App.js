import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllBooks from './allBooks';
import ViewMore from './viewmore';
import BookAdded from './bookadded';
import axios from 'axios';
import useMultiple from './custom-hooks/useMultiple';


function App() {
  let [name, handleName, title, handleTitle, descr, handleDesc, pageNumbers, handlePageNumber, genre, handleGenre, boo, handleBoo, edit, handleEdit] = useMultiple()


  const doneBtn = async (value) => {
    let { foundBookId, name, title, descr, pageNumbers, genre } = value
    if (name !== '' && title !== '' && descr !== '' && pageNumbers !== '' && genre !== '') {

      try {
        let response = await axios.patch(`http://localhost:8500/store/editdone/${foundBookId}`, { name, title, pageNumbers, descr, genre, edit: false }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        handleBoo(true)
        alert(response.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    else { alert('inputs cants be blank') }
  }

  const amendBtn = async (any, id) => {
    switch (true) {
      case any === 'edit':
        try {
          let response = await axios.patch(`http://localhost:8500/store/edit/${id}`, { edit: true }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          handleBoo(true)
        }
        catch (err) {
          console.error(err)
        }
        handleBoo(false);
        break;

      case any === 'del':
        try {
          let response = await axios.delete(`http://localhost:8500/store/delete/${id}`)
          handleBoo(true)
        }
        catch (err) {
          console.error(err)
        }
        break;
    }
  }

  return (
    <Routes>
      <Route path='/*' element={<HomePage />} />
      <Route path='/allbooks/:userId' element={<AllBooks boo={boo} />} />
      <Route path='/viewmore/:bookId/:userId' element={<ViewMore amendBtn={amendBtn} doneBtn={doneBtn} />} />
      <Route path='/bookadded/:userId' element={<BookAdded amendBtn={amendBtn} doneBtn={doneBtn} />} />
    </Routes>
  );
}

export default App;
