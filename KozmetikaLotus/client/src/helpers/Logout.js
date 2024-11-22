import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear("token");
        localStorage.clear("ADMIN_TAB");
        navigate("/login");
    }

    return {
        logout
    }
}

export default Logout;