let allState = ''
const myReducer = (state = allState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username
            }
        case "SIGN_OUT":
            return {
                ...state,
                id: '',
                username: ''
            }
        case "BOOK_SEARCH":
            let { searchedBook } = action.payload
            return {
                ...state,
                searchedBook
            }
        case "EDIT_RESPONSE":
            let { editResponse, bookId } = action.payload
            return {
                ...state,
                editResponse,
                bookId
            }
        case "REMOVE_RESPONSE":
            return {
                ...state,
                editResponse: '',
                bookId: ''
            }
    }
    return state
}
export default myReducer;