import Navbar from "@/components/layouts/Navbar";

export default function RootLayout({ children }) {
    return (
        <>
            <Navbar>{children}</Navbar>
        </>
    );
}

