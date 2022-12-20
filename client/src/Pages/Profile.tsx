import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from "../Components/Modal/Modal";
import {useStore} from "../store";
import ProfileModal from "../Components/Modal/ProfileModal";

const Profile = () => {
    const [active,setActive] = useState<boolean>(true)
    const history = useNavigate()
    const {userStore} = useStore()
    const [isEdite,setIsEdite] = useState<boolean>(false)
    const {currentUser} = userStore
    return (
        <Modal active={active} onHide={(bol:boolean)=> {
            setActive(bol)
            history(-1)
        }}>
            <ProfileModal/>
        </Modal>
    );
};

export default Profile;