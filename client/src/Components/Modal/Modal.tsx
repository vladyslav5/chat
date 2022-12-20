import React, {FC, ReactNode} from 'react';
import {createPortal} from "react-dom";


interface props {
    active: boolean,
    onHide: (bool: boolean) => void,
    children: ReactNode
}

const Modal: FC<props> = ({active, onHide, children}) => {
    if(!active) return  null
    return createPortal(<div
        className={active ? "ChatBarModal active" : "ChatBarModal"}
        onClick={() => {
            onHide(false)
        }}
    >
        <div
            onClick={e => e.stopPropagation()}
            className={"modalContent"}
        >
            {children}
        </div>
    </div>,document.body)
}

export default Modal;