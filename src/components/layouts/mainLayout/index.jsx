/* eslint-disable no-unused-vars */
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomTrigger } from "./CustomTrigger";
import { AppLogo } from "@/components/ui/AppLogo";
import { Link } from "react-router";
import { Home, Compass, PlusSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/auth/context/auth-context";
import { UserCircleIcon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

export default function MainLayout({ children }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <TopNavbar />
            <AppSidebar />
            <main className="mt-16 w-full">{children}</main>
        </SidebarProvider>
    );
}
export function TopNavbar() {
    return (
        <nav className="md:hidden md:z-auto z-50 bg-background text-foreground fixed left-0 right-0 top-0 h-16 flex items-center gap-1">
            <div className="w-[calc(var(--sidebar-width)-4px)]">
                <SidebarGroup className="flex-row items-center gap-2">
                    <CustomTrigger />
                    <AppLogo href="/" />
                </SidebarGroup>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2 p-4">
                <div className="h-8 w-8 rounded-full border-2 border-primary"></div>
            </div>
        </nav>
    );
}
const StreamMode = [
    { name: "Home", href: "/", Icon: Home },
    { name: "Explore", href: "/explore", Icon: Compass },
    { name: "Create", href: "/create", Icon: PlusSquare },
];
function AppSidebar() {
    const { user } = useAuth();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="bg-background text-foreground p-0.5 pt-2">
                <SidebarGroup className="flex-row items-center gap-2">
                    <CustomTrigger />
                    <AppLogo href="/" />
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent className="bg-background text-foreground">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {StreamMode.map(({ href, name, Icon }) => (
                                <SidebarMenuItem key={href}>
                                    <SidebarMenuButton asChild tooltip={name}>
                                        <Link to={`${href}`}>
                                            <Icon />
                                            <span>{name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={"Profile"}>
                                    <Link className="mt-auto" to={`/${user?.username}`}>
                                        <div>
                                            <Avatar className="size-4 text-lg">
                                                <AvatarImage
                                                    src={user?.profilePicture}
                                                    alt={`${user?.username} profile-picture`}
                                                />
                                                <AvatarFallback className={"text-sm bg-transparent font-bold"}>
                                                    <UserCircleIcon />
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <span>Profile</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-background text-foreground">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SettingDropDown />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { LogOut } from "lucide-react";

function SettingDropDown() {
    const { isMobile, state } = useSidebar();
    const { theme, setTheme } = useTheme();
    const { signout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <Settings /> Setting
                    <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={state !== "collapsed" || isMobile ? "top" : "right"}
                className={`${state !== "collapsed" || isMobile ? "w-[var(--radix-popper-anchor-width)]" : ""}`}
            >
                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun className="rounded-full" /> : <Moon className="rounded-full" />}
                    <span>Toggle Theme</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signout} className={"text-destructive"}>
                    <LogOut className="text-destructive" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
