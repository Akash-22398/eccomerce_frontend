import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/userAuth";

export default function ProtectedRoute({ children, requiredPermission }) {
    let { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }

    }, [isAuthenticated, requiredPermission, user,]);

    return children;
}