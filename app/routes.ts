import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    // Home
    index("routes/home.tsx"),

    // Auth
    ...prefix('/auth', [
        layout('layouts/authLayout.tsx', [
            route('login', 'routes/auth/loginPage.tsx'),
            route('register', 'routes/auth/registerPage.tsx'),
        ])
    ]),


    // Chat
    ...prefix('/chat', [
        layout('layouts/chatLayout.tsx', [
            index('routes/chat/noChatSelectedPage.tsx'),
            route(':idClient', 'routes/chat/clientChatPage.tsx'),
        ])
    ])
    

] satisfies RouteConfig;
