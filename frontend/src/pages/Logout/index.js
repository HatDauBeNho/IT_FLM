import { useEffect } from "react"
import { APILogout } from "src/services/connectAPI/auth"

const LogOut = (props) => {
    const logOut = async () => {
        const result = await APILogout()
        localStorage.clear()
        window.open("/login", "_parent")
    }

    useEffect(() => {
        logOut()
    }, [props])
    return (
        <div>
        </div>
    )
}
export default LogOut