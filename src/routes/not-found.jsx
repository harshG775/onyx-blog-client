import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";

export default function NotFoundRoute() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-6">
            <h1 className="text-5xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
                The page <strong className="text-foreground">{location.pathname}</strong> you are looking for does not
                exist. Please check the URL or go back to the homepage.
            </p>
            <Button onClick={handleNavigation}>Go {location.key !== "default" ? "Back" : "Home"}</Button>
        </div>
    );
}
