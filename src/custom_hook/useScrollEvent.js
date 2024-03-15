import { useEffect } from "react"
import useCustomRef from "./useCustomRef";

const useScrollEvent = () => {

    const [navbarRef, bookeryRef, menuRef, basketRef] = useCustomRef()

    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
        console.log(navbarRef)

        let genreSection = document.querySelector('.genre-section');
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos && navbarRef) {
            navbarRef.current.style.top = '0';
            genreSection.classList.remove('no-display-scroll');
        } else {
            genreSection.classList.add('no-display-scroll');
        }


        prevScrollPos = currentScrollPos;
    };

    return [handleScroll]

}
export default useScrollEvent