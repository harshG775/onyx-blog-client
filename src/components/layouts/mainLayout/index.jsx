/* eslint-disable no-unused-vars */
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomTrigger } from "./CustomTrigger";
import { AppLogo } from "@/components/ui/AppLogo";
import { Link } from "react-router";
import { Home, Compass, PlusSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MainLayout({ children }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <TopNavbar />
            <AppSidebar />
            <main className="mt-16 w-full">{children}</main>
        </SidebarProvider>
    );
}
export function TopNavbar() {
    return (
        <nav className="bg-background text-foreground fixed left-0 right-0 top-0 z-50 h-16 flex items-center gap-1">
            <div className="w-[calc(var(--sidebar-width)-4px)] p-2">
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
    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader className="flex md:hidden bg-background text-foreground">
                <SidebarGroup className="flex-row items-center gap-2">
                    <CustomTrigger />
                    <AppLogo href="/" />
                </SidebarGroup>
            </SidebarHeader>
            <div className="h-16 md:flex hidden"></div>
            <SidebarContent className="bg-background text-foreground">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {StreamMode.map(({ href, name, Icon }) => (
                                <SidebarMenuItem key={href}>
                                    <SidebarMenuButton asChild tooltip={name}>
                                        <Link to={`${href}`}>
                                            <Icon className="size-4" />
                                            <span>{name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={"user?.username"}>
                                    <Link className="mt-auto" to={`/${"user?.username"}`}>
                                        <div>
                                            <Avatar className="size-4 text-lg">
                                                <AvatarImage
                                                    src={"user?.profilePicture"}
                                                    alt={`${"user?.username"} profile-picture`}
                                                />
                                                <AvatarFallback>{"user?.username"[0]}</AvatarFallback>
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
            <SidebarFooter className="bg-background text-foreground" />
        </Sidebar>
    );
}
