import axios from "axios"

export const handleDone = (value) => {
    return async (dispatch) => {
        dispatch({ type: 'EDIT_DONE', payload: value });

        let { foundBookId, name, title, descr, pageNumbers, genre } = value
        if (name !== '' && title !== '' && descr !== '' && pageNumbers !== '' && genre !== '') {

            try {
                let response = await axios.patch(`http://localhost:8600/store/editdone/${foundBookId}`, { name, title, pageNumbers, descr, genre, edit: false }, {
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
        else { alert('inputs cants be blank') }
    }
}

export const handleEdit = (any, id, myJwt) => {
    return async () => {
        switch (any) {
            case 'edit':
                try {
                    let response = await axios.patch(`http://localhost:8600/store/edit/${id}`, null, {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                        }
                    })
                    alert(response.data)
                }
                catch (err) {
                    console.error(err)
                }
                break;
            case 'del':
                try {
                    let response = await axios.delete(`http://localhost:8600/store/delete/${id}`)
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
                    const response = await axios.post("http://localhost:8600/user/login", { username: userName, password },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })
                    if (response.data === "") return alert('Incorrect Details')
                    let { accessToken, username } = response.data
                    dispatch({ type: "LOGIN", payload: { accessToken, username } })
                }
                catch (err) { console.error(err) }
                break;

            case 'signup':
                try {
                    const response = await axios.post("http://localhost:8600/user/register", { username: userName, password },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })
                    let { accessToken, username } = response.data
                    console.log(response.data)
                    dispatch({ type: "LOGIN", payload: { accessToken, username } })
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
        dispatch({ type: "SIGN_OUT" })

    }
}

export const handleBookAdd = (value) => {
    return async () => {
        let { name, title, pageNumbers, descr, genre, edit, userToken } = value
        try {
            const response = await axios.post("http://localhost:8600/store/addbook", { name, title, pageNumbers, descr, genre, edit, userToken },
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
            const response = await axios.post("http://localhost:8600/store/searchBook", { bookName },
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