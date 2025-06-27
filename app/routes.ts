import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    // Home
    index("routes/home.tsx"),

    // Auth
    ...prefix('/auth', [
        layout('layouts/authLayout.tsx', [
            route('login', 'routes/auth/loginPage.tsx'),
            route('register', 'routes/auth/registerPage.tsx'),
            route('testing', 'routes/auth/testingPage.tsx'),
            route('testingargs/:id/:name/:age', 'routes/auth/testingArgsPage.tsx'),

            // Actions
            route('logout', 'auth/actions/logout.action.ts'),
        ])
    ]),


    // Chat
    ...prefix('/chat', [
        layout('layouts/chatLayout.tsx', [
            index('routes/chat/noChatSelectedPage.tsx'),
            route('client/:id', 'routes/chat/clientChatPage.tsx'),
        ])
    ]),
    

] satisfies RouteConfig;
