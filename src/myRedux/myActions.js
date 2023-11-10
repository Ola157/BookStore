import axios from "axios"


export const handleRegister = (value) => (dispatch) => {
    dispatch({ type: 'REGISTER', payload: { value } })
}

export const handleAuth = (data) => (dispatch) => {
    const { type, userName, password } = data

    switch (type) {
        case 'login':
            axios.post("https://book-store-back-end-three.vercel.app/user/login", { username: userName, password },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((response) => {
                    const { accessToken, username, message } = response.data
                    if (accessToken && username) {
                        localStorage.setItem('accessToken', accessToken)
                        dispatch({ type: "LOGIN", payload: { username } })
                    }
                    else {
                        dispatch({ type: "MESSAGE", payload: { message } })

                        setTimeout(() => {
                            dispatch({ type: "MESSAGE", payload: { message: '' } })
                        }, 2000)
                    }

                }).catch((err) => {
                    console.error(err)
                })
            break;

        case 'signup':
            axios.post("https://book-store-back-end-three.vercel.app/user/register", { username: userName, password },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((response) => {
                    const { message } = response.data
                    if (message !== 'User Already Exist') {
                        dispatch({ type: "MESSAGE", payload: { message } })

                        dispatch({ type: "REGISTER", payload: { value: true } })
                    } else if (message == 'User Already Exist') {
                        dispatch({ type: "MESSAGE", payload: { message } })
                    }
                    setTimeout(() => {
                        dispatch({ type: "MESSAGE", payload: { message: '' } })
                    }, 2000)

                })
                .catch((error) => {
                    console.error(error)
                })
            break;

    }
}

export const handleGetAllBooks = () => (dispatch) => {

    axios.get("https://book-store-back-end-three.vercel.app/store/allbooks", null)
        .then((response) => {
            const { allBooks } = response.data

            dispatch({ type: "ALL_BOOKS", payload: { allBooks } })
        })
        .catch((err) => { console.error(err) })
}

export const handleViewedBook = (bookId) => (dispatch) => {
    axios.get(`https://book-store-back-end-three.vercel.app/store/viewmore/${bookId}`, null)
        .then((response) => {
            const { viewedBook } = response.data
            dispatch({ type: 'VIEWED_BOOK', payload: { viewedBook } })
        }).catch((err) => {
            console.error(err)
        })
}

export const handleChanges = (type, bookId, data) => {

    return async (dispatch) => {
        let myJwt = localStorage.getItem('accessToken')
        switch (type) {
            case 'edit':
                try {
                    let response = await axios.patch(`https://book-store-back-end-three.vercel.app/store/edit/${bookId}`, null, {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                        }
                    })
                    let { myUploads } = response.data
                    dispatch({ type: 'MY_UPLOADS', payload: { myUploads } })
                }
                catch (err) {
                    console.error(err)
                }
                break;
            case 'delete':
                try {
                    let response = await axios.delete(`https://book-store-back-end-three.vercel.app/store/delete/${bookId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${myJwt}`
                            }
                        })
                    let { myUploads } = response.data
                    dispatch({ type: 'MY_UPLOADS', payload: { myUploads } })
                }
                catch (err) {
                    console.error(err)
                }
                break;
            case 'save':
                try {
                    let response = await axios.patch(`https://book-store-back-end-three.vercel.app/store/save/${bookId}`, { data }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${myJwt}`
                        }
                    })
                    let { myUploads } = response.data
                    dispatch({ type: 'MY_UPLOADS', payload: { myUploads } })
                }

                catch (err) {
                    console.error(err)
                }
                break;
            case 'cancel':
                try {
                    let response = await axios.patch(`https://book-store-back-end-three.vercel.app/store/cancel/${bookId}`, null, {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                        }
                    })
                    let { myUploads } = response.data
                    dispatch({ type: 'MY_UPLOADS', payload: { myUploads } })
                }

                catch (err) {
                    console.error(err)
                }
                break;

        }
    }
}

export const handleBookAdd = (data) => async () => {
    let { authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook } = data
    let myJwt = localStorage.getItem('accessToken')
    try {
        await axios.post("https://book-store-back-end-three.vercel.app/store/addbook",
            { authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${myJwt}`
                }
            })

    }
    catch (err) {
        console.error(err)
    }
}

export const handleUserUploads = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get(`https://book-store-back-end-three.vercel.app/user/fetchuserUploads/`, {
            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        })
        let { myUploads } = response.data
        if (myUploads) {
            dispatch({ type: "MY_UPLOADS", payload: { myUploads } })
        }
    }
    catch (err) { console.error(err) }
}

export const handleAllSearch = (bookTitle) => (dispatch) => {
    if (!bookTitle) return
    axios.get(`https://book-store-back-end-three.vercel.app/store/searchBook/${bookTitle}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            const { searchedBook, message } = response.data
            if (searchedBook) { return dispatch({ type: "BOOK_SEARCH", payload: { searchedBook } }) }
            else {
                dispatch({ type: "MESSAGE", payload: { message } })
                setTimeout(() => {
                    dispatch({ type: "MESSAGE", payload: { message: '' } })
                }, 2000)
            }
        }).catch((error) => { console.error(error) })
}

export const clearSearch = () => (dispatch) => {
    dispatch({ type: "BOOK_SEARCH", payload: { searchedBook: '' } })
}

export const handleNewMessage = (message) => (dispatch) => {
    dispatch({ type: "MESSAGE", payload: { message } })
    setTimeout(() => {
        dispatch({ type: "MESSAGE", payload: { message: '' } })
    }, 2000)
}

export const handleSignOut = () => (dispatch) => {
    dispatch({ type: "SIGN_OUT" })
}



