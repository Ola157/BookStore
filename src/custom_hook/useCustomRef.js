import { useRef } from "react"

const useCustomRef = () => {
    const navbarRef = useRef(null)
    const bookeryRef = useRef(null)
    const menuRef = useRef(null)
    const basketRef = useRef(null)

    return [navbarRef, bookeryRef, menuRef, basketRef]
};

export default useCustomRef