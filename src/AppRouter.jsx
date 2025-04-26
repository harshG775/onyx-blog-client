import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import ErrorBoundary from "./components/appRouter/ErrorBoundary";
import Loading from "./routes/loading";
import RootLayout from "./routes/layout";
// routes
const NotFoundRoute = lazy(() => import("./routes/not-found"));
import RootRoute from "./routes";
import CreateRoute from "./routes/create";
import SignInRoute from "./routes/(auth)/signin";
import SignUpRoute from "./routes/(auth)/signup";
import VerifyRoute from "./routes/(auth)/verify";
import ProfileRoute from "./routes/[username]/route";

const router = createBrowserRouter([
    { path: "signup", element: <SignUpRoute /> },
    { path: "verify", element: <VerifyRoute /> },
    { path: "signin", element: <SignInRoute /> },
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
            { path: "create", element: <CreateRoute /> },
            { path: "edit/:slug", element: <RootRoute /> },

            // Profile & Follow/Unfollow
            { path: "/:username", element: <ProfileRoute /> }, //<ProfileRoute/>>  View user profile
            { path: "/:username/posts", element: <RootRoute /> }, //<UserPostsRoute/>  View posts by user
            { path: "/:username/followers", element: <RootRoute /> }, //<FollowersRoute/>  Who follows the user
            { path: "/:username/following", element: <RootRoute /> }, //<FollowingRoute/>  Who the user follows

            { path: "*", element: <NotFoundRoute /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
