import { AuthProvider } from "@/auth/context/auth-context";
import { ThemeProvider } from "./theme-provider";
import React from "react";
import { createAuthService } from "@/auth/context/createAuthService";

export default function Providers({ children }) {
    return (
        <>
            <AuthProvider
                authService={createAuthService({ apiUrl: `${import.meta.env.VITE_API_URL}/api/v1.0.0/auth` })}
            >
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </>
    );
}
