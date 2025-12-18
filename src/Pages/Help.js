import { Children } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouter = ( {Children})=> {
    const navigate =useNavigate();
    const auth = localStorage.getItem("auth");
    if(auth === true){
        return Children;
    }
    return <Navigate to= {"/login"} replace></Navigate>
}

export default ProtectedRouter;