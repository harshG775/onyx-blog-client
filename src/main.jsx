import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";
import Providers from "./components/providers";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Providers>
            <AppRouter />
        </Providers>
    </StrictMode>,
);
