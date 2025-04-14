import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import ErrorBoundary from "./components/appRouter/ErrorBoundary";
import Loading from "./routes/loading";
import RootLayout from "./routes/layout";
// routes
const NotFoundRoute = lazy(() => import("./routes/not-found"));
import RootRoute from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RootLayout>
                <ErrorBoundary>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </RootLayout>
        ),
        children: [
            { index: true, element: <RootRoute /> },
            { path: "posts/:slug", element: <RootRoute /> },
            { path: "create", element: <RootRoute /> },
            { path: "edit/:slug", element: <RootRoute /> },

            // Profile & Follow/Unfollow
            { path: "profile/:username", element: <RootRoute /> }, //<ProfileRoute/>>  View user profile
            { path: "profile/:username/posts", element: <RootRoute /> }, //<UserPostsRoute/>  View posts by user
            { path: "profile/:username/followers", element: <RootRoute /> }, //<FollowersRoute/>  Who follows the user
            { path: "profile/:username/following", element: <RootRoute /> }, //<FollowingRoute/>  Who the user follows

            { path: "*", element: <NotFoundRoute /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
