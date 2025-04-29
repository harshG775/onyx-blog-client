import { useAuth } from "@/auth/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";
import { PlusSquare } from "lucide-react";
import { Home } from "lucide-react";
import { Link } from "react-router";

export default function Navbar({ children }) {
    const { user } = useAuth();

    return (
        <>
            <div className="w-60 overflow-hidden fixed left-0 top-0 bottom-0 bg-secondary/90 dark:bg-secondary/20 border-r">
                <nav className="p-2 flex gap-2 flex-col h-full">
                    <NavItem to="/" className="py-6 px-4 hover:bg-transparent">
                        <h1 className="font-bold text-2xl">
                            <div className="inline-block text-primary">Onyx</div>
                            Blog
                        </h1>
                    </NavItem>

                    <NavItem to="/">
                        <Home className="size-6" />
                        <span>Home</span>
                    </NavItem>

                    <NavItem to="/explore">
                        <Compass className="size-6" />
                        <span>Explore</span>
                    </NavItem>

                    <NavItem to="/create">
                        <PlusSquare className="size-6" />
                        <span>Create</span>
                    </NavItem>

                    <NavItem className="mt-auto" to={`/${user?.username}`}>
                        <Avatar className="size-6 text-lg">
                            <AvatarImage src={user?.profilePicture} alt={`${user?.username} profile-picture`} />
                            <AvatarFallback>{user?.username[0]}</AvatarFallback>
                        </Avatar>
                        <span>Profile</span>
                    </NavItem>
                </nav>
            </div>
            <div className="pl-60">{children}</div>
        </>
    );
}

const NavItem = ({ to, children, className = "", ...props }) => {
    const baseClasses =
        "hover:bg-primary/20 dark:hover:bg-primary/5 text-foreground py-2 px-4 rounded-sm flex items-center gap-6 active:scale-95";

    if (to) {
        return (
            <Link {...props} to={to} className={cn(baseClasses, className)}>
                {children}
            </Link>
        );
    }

    return (
        <button {...props} className={cn(baseClasses, className)}>
            {children}
        </button>
    );
};
