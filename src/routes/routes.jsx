import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignupPage from "../pages/SignupPage";
import { Login } from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AddTransaction from "../pages/AddTransiction";
import MyTransactions from "../pages/Mytransaction";
import TransactionDetails from "../pages/TransactionDetails";
import UpdateTransaction from "../pages/UpdateTransaction";
import MyProfile from "../pages/MyProfile";
import NotFound from "../pages/NotFound";
import Reports from "../pages/Reports";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signup",
                element: <SignupPage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/add-transaction",
                element: (
                    <PrivateRoute>
                        <AddTransaction />
                    </PrivateRoute>
                )
            },
            {
                path: "/my-transactions",
                element: (
                    <PrivateRoute>
                        <MyTransactions />
                    </PrivateRoute>
                ),
            },
            {
                path: "/transaction/:id",
                element: (
                    <PrivateRoute>
                        <TransactionDetails />
                    </PrivateRoute>
                ),
                loader: ({ params }) => fetch(`https://finese-server-api.vercel.app/transactions/${params.id}`)
            },
            {
                path: "/transaction/update/:id",
                element: (
                    <PrivateRoute>
                        <UpdateTransaction />
                    </PrivateRoute>
                ),
                loader: ({ params }) => fetch(`https://finese-server-api.vercel.app/transactions/${params.id}`)

            },
            {
                path: "/reports",
                element: (
                    <PrivateRoute>
                        <Reports />
                    </PrivateRoute>
                ),
                loader: () => fetch('https://finese-server-api.vercel.app/transactions')
            },
            {
                path: "/my-profile",
                element: (
                    <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
                )
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);