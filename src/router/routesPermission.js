export const permissions = {
    admin: [
        '/users',
        '/todos/:id',
        '/register',
        '/todos', 
        '/logout'
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
