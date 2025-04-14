import { ThemeProvider } from "./theme-provider";
import React from "react";

export default function Providers({ children }) {
    return (
        <>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                {children}
            </ThemeProvider>
        </>
    );
}
