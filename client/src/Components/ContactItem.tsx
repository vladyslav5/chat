import React from 'react';
import {UserType} from "../types/UserType";
import {useStore} from "../store";
import {baseURL} from "../apis";

interface props {
    user: UserType
    hide?:(bol:boolean)=>void
}

const ContactItem = ({user,hide}: props) => {
    const {userStore} = useStore()
    const userModalHandler = () => {
        userStore.setChosenUser(user)
        if (hide) {
            hide(false)
        }
    }
    const avatar:string = "http://images.assetsdelivery.com/compings_v2/passatic/passatic1905/passatic190500501.jpg"
    return (
        <div
            onClick={userModalHandler}
            className={"Contact"}
        >
            <img alt={"avatar"} src={ !!user.avatar?(baseURL+user.avatar):avatar}/>
            {user.login}
        </div>
    );
};

export default ContactItem;