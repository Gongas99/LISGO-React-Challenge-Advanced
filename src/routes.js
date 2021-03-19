import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import Todos from "./pages/Todos";
import Users from "./pages/Users";
import LayoutNavbar from "./components/LayoutNavbar";
import Logout from "./pages/Logout";

const routes = [
    { path: '/', exact: true, component: Home, layout: LayoutNavbar },
    {
        path: '/login',
        exact: true,
        component: Login,
        layout: LayoutNavbar
    },
    {
        path: '/logout',
        exact: true,
        component: Logout,
    },
    {
        path: '/todos',
        exact: true,
        component: Todos, 
        layout: LayoutNavbar 
    },
    //ADMIN
    {
        path: '/users',
        exact: true,
        component: Users,
        layout: LayoutNavbar
    },
    {
        path: '/register',
        exact: true,
        component: Register,
        layout: LayoutNavbar
    }
];

export default routes;
