import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../Pages/RegisterPage";
import CheckEmailPage from "../Pages/CheckEmail";
import CheckPassword from "../Pages/CheckPassword";
import Home from "../Pages/HomePage";
import MessagePage from "../Components/MessagePage";
import AuthLayouts from "../layout";
import Forgotpassword from "../Pages/ForgotPassword";

const router = createBrowserRouter([
{
    path : "/",
    element : <App/>,
    children : [
        {
            path : "register",
            element : <AuthLayouts><RegisterPage /></AuthLayouts>
        },
        {
            path : 'verify-email',
            element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
        },
        {
            path : 'verify-password',
            element : <AuthLayouts><CheckPassword/></AuthLayouts>
        },
        {
            path : 'forgot-password',
            element : <AuthLayouts><Forgotpassword/></AuthLayouts>
        },
        {
            path : "",
            element : <Home/>,
            children : [
                {
                    path : ':userId',
                    element : <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router