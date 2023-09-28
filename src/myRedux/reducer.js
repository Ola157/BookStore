let allState = {
    isRegister: false,
    myUploads: []
}
const myReducer = (state = allState, action) => {
    switch (action.type) {
        case "LOGIN":
            let { username, id } = action.payload
            return {
                ...state,
                username,
                userId: id
            }
        case "REGISTER":
            return {
                ...state,
                isRegister: true
            }

        case "SIGN_OUT":
            return {
                ...state,
                isLogin: false,
                userId: '',
                username: ''
            }
        case "BOOK_SEARCH":
            let { searchedBook } = action.payload
            return {
                ...state,
                searchedBook
            }
        case "CLEAR_SEARCHED":
            return {
                ...state,
                searchedBook: ''
            }

        case "MY_UPLOADS":
            let { myUploads } = action.payload
            return {
                ...state,
                myUploads
            }
    }
    return state
}
export default myReducer;