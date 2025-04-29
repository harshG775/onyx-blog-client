import { useAuth } from "@/auth/context/auth-context";
import Navbar from "@/components/layouts/Navbar";
import { Navigate } from "react-router";

export default function RootLayout({ children }) {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/signin" />;
    return (
        <>
            <Navbar>{children}</Navbar>
        </>
    );
}
