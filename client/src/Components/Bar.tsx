import React, {useState} from 'react';
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import {menu} from "../utils/menu";
import {menuType} from "../types/MenuType";
import MenuItem from "./MenuItem";
import userStore from "../stores/userStore";
import {ChatType} from "../types/ChatType";
import {ChatItem} from "./ChatItem";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import Contacts from "../Pages/Contacts";

interface props {
    active: boolean,
    setActive: (bol: boolean) => void,
    chats: ChatType[] | null,
    route: string
}

const Bar = ({active, setActive, chats, route}: props) => {
    const history = useNavigate()
    return (
        <div className={"bar_wrap"}>
            <Navbar active={active} setActive={setActive}/>
            {active
                ?
                <SideBar items={menu} renderItem={(m: menuType) => <MenuItem menu={m}/>}>
                    <div>
                        <div className={"menu"}
                        >
                            <Contacts></Contacts>

                            <h2 onClick={() => {
                                localStorage.setItem("token","")
                                userStore.setIsAuth(false, null)
                                history(LOGIN_ROUTE)
                            }}>вийти</h2>

                        </div>
                    </div>
                </SideBar>
                :
                <SideBar
                    route={route}
                    items={chats}
                    renderItem={(chat: ChatType) => <ChatItem route={route} key={chat.name}
                                                              chat={chat}/>}
                />
            }
        </div>
    );
};

export default Bar;