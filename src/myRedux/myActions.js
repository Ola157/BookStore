import axios from "axios"

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

export const handleSignupLogin = (data) => {
    let { any, userName, password } = data

    return async (dispatch) => {
        switch (any) {
            case 'login':
                try {
                    const response = await axios.post("https://book-store-back-end-three.vercel.app/user/login", { username: userName, password },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })
                    if (!response.data) return alert('Incorrect Details')
                    let { accessToken, username, id } = response.data
                    localStorage.setItem('accessToken', accessToken)
                    dispatch({ type: "LOGIN", payload: { username, id } })
                }
                catch (err) { console.error(err) }
                break;

            case 'signup':
                try {
                    const response = await axios.post("https://book-store-back-end-three.vercel.app/user/register", { username: userName, password },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })

                    if (response.data === 'registered') {
                        dispatch({ type: "REGISTER" })
                    }
                }

                catch (error) {
                    console.error(error);
                }

                break;

        }
    }
}

export const handleSignOut = () => {
    return (dispatch) => {
        localStorage.removeItem('accessToken')
        dispatch({ type: "SIGN_OUT" })
    }
}

export const handleBookAdd = (data) => {
    return async (dispatch) => {
        let { authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook } = data
        let myJwt = localStorage.getItem('accessToken')
        try {
            const response = await axios.post("https://book-store-back-end-three.vercel.app/store/addbook", { authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${myJwt}`
                    }
                })
            let { myUploads } = response.data
            dispatch({ type: "MY_UPLOADS", payload: { myUploads } })

        }
        catch (err) {
            console.error(err)
        }
    }
}

export const handleUserUploads = () => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
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

export const handleAllSearch = (bookTitle) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://book-store-back-end-three.vercel.app/store/searchBook/${bookTitle}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
            let { searchedBook } = response.data
            dispatch({ type: "BOOK_SEARCH", payload: { searchedBook } })
        }
        catch (err) { console.log(err) }
    }
}

export const handleSearchedBook = () => (dispatch) => {
    dispatch({ type: 'CLEAR_SEARCHED' })
}
