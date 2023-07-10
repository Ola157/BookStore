let allState = ''
const myReducer = (state = allState, action) => {
    switch (action.type) {
        case "LOGIN":
            let { accessToken, username } = action.payload
            return {
                ...state,
                accessToken,
                username
            }
        case "SIGN_OUT":
            return {
                ...state,
                accessToken: '',
                username: ''
            }
        case "BOOK_SEARCH":
            let { searchedBook } = action.payload
            return {
                ...state,
                searchedBook
            }
    }
    return state
}
export default myReducer;