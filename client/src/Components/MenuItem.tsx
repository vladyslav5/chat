import React from 'react';
import {menuType} from "../types/MenuType";
import {NavLink} from "react-router-dom";
import {useStore} from "../store";

interface props {
    menu: menuType
}

const MenuItem = ({menu}: props) => {
    const {userStore} = useStore()
    console.log(menu.children)
    return (
        <div className={"menu"}>
            {menu.path && <NavLink to={menu.path}>
                <h2>
                    {menu.name}
                </h2>
            </NavLink>}
        </div>
    );
};

export default MenuItem;