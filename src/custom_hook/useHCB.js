import { useState } from "react"

const useHCB = () => {
    let [activeCategory, setActiveNav] = useState('')

    const handleFooterBtn = (toggleType) => {
        setActiveNav((prev) => toggleType == prev ? null : toggleType)
    }

    return [activeCategory, handleFooterBtn]
}
export default useHCB