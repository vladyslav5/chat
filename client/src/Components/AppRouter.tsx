import React, {useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {useStore} from "../store";
import {CHATS_ROUTE, LOGIN_ROUTE, MY_CHATS_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import Modal from "./Modal/Modal";
import UserModal from "./Modal/UserModal";
import NotificationModal from "./Modal/NotificationModal";
import {check} from "../apis/userApi";
import Contacts from "../Pages/Contacts";


const AppRouter = observer(() => {
    const {userStore} = useStore()
    const {isAuth} = userStore
    const history = useNavigate()
    // useEffect(() => {
    //     check().then(res => {
    //         if(localStorage.getItem('token')){
    //             userStore.setIsAuth(true, res)
    //             history(MY_CHATS_ROUTE)
    //         }
    //     })
    // },[])
    return (
        <>
            <Routes>
                {isAuth && authRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>
                )}
                {publicRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>
                )}
                <Route path={"*"} element={<Navigate to={isAuth ? MY_CHATS_ROUTE : LOGIN_ROUTE}/>}/>
            </Routes>
            <Modal active={userStore.active} onHide={(bol: boolean) => userStore.setActive(bol)}>
                <UserModal active={userStore.active} onHide={(bol: boolean) => userStore.setActive(bol)}/>
            </Modal>
            {/*<Modal active={false} onHide={()=>console.log("hide")}>*/}
            {/*    <NotificationModal/>*/}
            {/*</Modal>*/}
        </>
    );
});

export default AppRouter;