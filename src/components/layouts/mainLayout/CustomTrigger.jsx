
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export function CustomTrigger() {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon"
            className={"size-7 rounded-full"}
            onClick={toggleSidebar}
        >
            <Menu />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}