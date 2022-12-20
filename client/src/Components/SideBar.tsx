import React, {ReactElement, ReactNode} from 'react';
import {CHATS_ROUTE, MY_CHATS_ROUTE} from "../utils/consts";

interface SideBarProps<T> {
    items: T[] | null,
    renderItem: (item: T) => ReactNode | ReactElement,
    children?: ReactElement,
    route?: string
}

function SideBar<T>(props: SideBarProps<T>) {

    return (
        <div className={"sidebar"}>
            <h2>{props.route === CHATS_ROUTE ? "Все чаты :" : (props.route === MY_CHATS_ROUTE && "Ваши чаты :")}</h2>
            <div>{props.items?.length === 0 && <h2>Здесь пока ничего нету</h2>}</div>
            {props.items && props.items.map(props.renderItem)}
            {props.children && React.cloneElement(props.children)}
        </div>
    )
}

export default SideBar;