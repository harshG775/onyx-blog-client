import { ModeToggle } from "@/components/ui/mode-toggle";

export default function RootLayout({ children }) {
    return (
        <>
            {children}
            <div className="fixed bottom-4 right-4">
                <ModeToggle />
            </div>
        </>
    );
}
