import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import Todos from "./pages/Todos";
import Users from "./pages/Users";

const routes = [
    { path: '/', exact: true, component: Home },
    {
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        path: '/todos',
        exact: true,
        component: Todos,
    },
    //ADMIN
    {
        path: '/users',
        exact: true,
        component: Users,
    },
    {
        path: '/register',
        exact: true,
        component: Register,
    }
];

export default routes;
