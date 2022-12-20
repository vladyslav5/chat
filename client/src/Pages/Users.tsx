import React, {ChangeEvent, EventHandler, useState} from 'react';
import Modal from "../Components/Modal/Modal";
import {useNavigate} from "react-router-dom";
import {UserType} from "../types/UserType";
import {getAll} from "../apis/userApi";
import ContactItem from "../Components/ContactItem";

const Users = () => {
    const [active,setActive] = useState<boolean>(true)
    const history = useNavigate()
    const [users,setUsers] = useState<UserType[] | null>(null)
    const searchHandler = (value:string)=>{
        getAll({login:value})
            .then((res)=>{
                setUsers(res)
                console.log(res)
            })
    }
    return (
        <Modal active={active} onHide={(bol:boolean)=> {
            setActive(bol)
            history(-1)
        }}>
            <input placeholder={"найти пользователя"} onChange={(e)=>searchHandler(e.target.value)}/>
            {users?.map((user)=><ContactItem user={user}/>)}
        </Modal>
    );
};

export default Users;