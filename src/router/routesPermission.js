export const permissions = {
    admin: [
        '/users',
        '/todos/:id',
        '/register'
    ],
    normal: [
        '/todos', 
        '/logout'
    ],
    all: [
        '/',
        '/login',
    ],
};
