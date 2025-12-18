import { useNavigate, Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
    const navigate = useNavigate();
    const auth = localStorage.getItem("auth");
    if(auth === "true"){
        return children;
    }
    return <Navigate to={"/login"} replace />
}

export default ProtectedRouter;