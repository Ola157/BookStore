import { useState } from "react";
const useMultiple = () => {
    let [name, handleName] = useState('')
    let [title, handleTitle] = useState('')
    let [descr, handleDesc] = useState('')
    let [pageNumbers, handlePageNumber] = useState('')
    let [genre, handleGenre] = useState('')
    let [boo, handleBoo] = useState('')
    let [edit, handleEdit] = useState('')

    return [name, handleName, title, handleTitle, descr, handleDesc, pageNumbers, handlePageNumber, genre, handleGenre, boo, handleBoo, edit, handleEdit];
}
export default useMultiple;