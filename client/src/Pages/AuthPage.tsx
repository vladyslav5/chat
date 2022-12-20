import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MY_CHATS_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useStore} from "../store";
import {login, registration} from "../apis/userApi";
import {decodedToken} from "../stores/userStore";

const AuthPage = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {userStore} = useStore()
    const history = useNavigate()
    const [nick, setNick] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const clickHandler = async () => {
        if (isLogin) {
            const data = await login(nick, password)
                .then((res: decodedToken) => {
                    userStore.setIsAuth(true, res)
                }).catch((e) => {
                    alert(e)
                })
        } else {
            const response = await registration(nick, password)
                .then((res) => {
                    userStore.setIsAuth(true, res)
                }).catch((e) => {
                    alert(e)
                })
        }
        history(MY_CHATS_ROUTE)
    }
    return (
        <div className={"auth_wrap"}>
            <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
            <input
                placeholder={"login"}
                value={nick}
                onChange={e => setNick(e.target.value)}
            />
            <input
                value={password}
                type={"password"}
                onChange={e => setPassword(e.target.value)}
                placeholder={"password"}
            />
            <div>
                <button
                    onClick={clickHandler}
                >
                    {isLogin ? "Войти" : "Зарегистрироваться"}</button>
            </div>
            <NavLink
                to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLogin ? "Зарегистрироваться" : "Войти"}</NavLink>
        </div>
    );
};

export default AuthPage;