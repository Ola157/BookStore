import axios from "axios"

export const handleDone = (value) => {
    return async (dispatch) => {
        dispatch({ type: 'EDIT_DONE', payload: value });

        let { foundBookId, name, title, descr, pageNumbers, genre, myJwt } = value
        if (name !== '' && title !== '' && descr !== '' && pageNumbers !== '' && genre !== '') {

            try {
                let response = await axios.patch(`https://book-store-back-end-three.vercel.app/store/editdone/${foundBookId}`, { name, title, pageNumbers, descr, genre, edit: false }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                alert(response.data)
            }
            catch (err) {
                console.error(err)
            }
        }

        else if (name == '' && title == '' && descr == '' && pageNumbers == '' && genre == '') {

            try {
                let response = await axios.patch(`https://book-store-back-end-three.vercel.app/store/edit/${foundBookId}`, null, {
                    headers: {
                        'Authorization': `Bearer ${myJwt}`,
                    }
                })
            }
            catch (err) {
                console.error(err)
            }
        }
    }
}

export const handleEdit = (any, id, myJwt) => {
    return async (dispatch) => {
        switch (any) {
            case 'edit':
                try {
                    let response = await axios.patch(`https://book-store-back-end-three.vercel.app/store/edit/${id}`, null, {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                        }
                    })
                    dispatch({ type: 'EDIT_RESPONSE', payload: { editResponse: response.data, bookId: id } })
                    if (response.data !== 'granted') return alert(response.data)
                }
                catch (err) {
                    console.error(err)
                }
                break;
            case 'del':
                try {
                    let response = await axios.delete(`https://book-store-back-end-three.vercel.app/store/delete/${id}`)
                }
                catch (err) {
                    console.error(err)
                }
                break;

        }
    }
}

export const handleSignupLogin = (value) => {
    let { any, userName, password } = value

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
                    if (response.data === "") return alert('Incorrect Details')
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
                    let { accessToken, username, id } = response.data
                    localStorage.setItem('accessToken', accessToken)
                    dispatch({ type: "LOGIN", payload: { username, id } })
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

export const handleBookAdd = (value) => {
    return async () => {
        let { name, title, pageNumbers, descr, genre, edit, userToken } = value
        try {
            const response = await axios.post("https://book-store-back-end-three.vercel.app/store/addbook", { name, title, pageNumbers, descr, genre, edit, userToken },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })

        }
        catch (err) {
            console.error(err)
        }
    }
}

export const handleAllSearch = (bookName) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("https://book-store-back-end-three.vercel.app/store/searchBook", { bookName },
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

export const handleResponseDelete = () => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_RESPONSE' })
    }
}