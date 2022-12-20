import {FC, ReactElement} from "react";

export interface menuType {
    name: string,
    path?:string,
    children?:ReactElement,
}