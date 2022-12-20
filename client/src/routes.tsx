import React from 'react';
import {
    ALL_USERS_ROUTE,
    CHATS_ROUTE,
    CONTACTS_ROUTE, CREATE_CHAT_ROUTE,
    LOGIN_ROUTE,
    MY_CHATS_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Chats from "./Pages/Chats";
import MyChats from "./Pages/MyChats";
import Contacts from "./Pages/Contacts";
import Users from "./Pages/Users";
import AuthPage from "./Pages/AuthPage";
import CreateChat from "./Pages/CreateChat";
import Profile from "./Pages/Profile";


export interface IRoute {
    path: string,
    element: React.ReactNode

}

export const publicRoutes: IRoute[] =
    [
        {
            path: CHATS_ROUTE,
            element: <Chats/>
        },
        {
            path: CHATS_ROUTE+"/:_id",
            element: <Chats/>
        },
        {
            path:LOGIN_ROUTE,
            element:<AuthPage/>
        },
        {
            path:REGISTRATION_ROUTE,
            element:<AuthPage/>
        },
    ]
export const authRoutes: IRoute[] =
    [
        {
            path: MY_CHATS_ROUTE,
            element: <MyChats/>
        },
        {
            path: MY_CHATS_ROUTE+"/:_id",
            element: <MyChats/>
        },
        {
            path: CONTACTS_ROUTE,
            element: <Contacts/>
        },
        {
            path: ALL_USERS_ROUTE,
            element: <Users/>
        },
        {
            path: CREATE_CHAT_ROUTE,
            element: <CreateChat/>
        },
        {
            path: PROFILE_ROUTE,
            element: <Profile/>
        },
    ]