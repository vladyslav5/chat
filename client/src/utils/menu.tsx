import {menuType} from "../types/MenuType";
import {
    ALL_USERS_ROUTE,
    CHATS_ROUTE,
    CONTACTS_ROUTE,
    CREATE_CHAT_ROUTE,
    MY_CHATS_ROUTE,
    PROFILE_ROUTE
} from "./consts";

export const menu: menuType[] = [
    {name: "создать чат", path: CREATE_CHAT_ROUTE},
    {name: "профиль", path: PROFILE_ROUTE},
    {name: "контакты", path: CONTACTS_ROUTE},
    {name: "мои чаты", path: MY_CHATS_ROUTE},
    {name: "все чаты", path: CHATS_ROUTE},
    {name: "найти пользователя", path: ALL_USERS_ROUTE},]