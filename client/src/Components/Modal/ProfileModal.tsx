import React, {useEffect, useState} from 'react';
import {baseURL} from "../../apis";
import {useStore} from "../../store";
import {UserType} from "../../types/UserType";
import {edite, getUserInfo} from "../../apis/userApi";
import {set} from "mobx";

const ProfileModal = () => {
    const {userStore} = useStore()
    const {currentUser} = userStore
    const userId = currentUser?._id
    const [avatar, setAvatar] = useState<any | null>()
    const [avatarUrl, setAvatarUrl] = useState<any | null>()
    const [user, setUser] = useState<UserType | null>(null)
    useEffect(() => {
        userId && getUserInfo(userId)
            .then((res) => {
                setUser(res)
            })
    }, [])
    const handleChangeFile = (file: any) => {
        let fileDataURL = new FileReader()
        fileDataURL.onloadend = (e) => {
            e.target && setAvatarUrl(e.target.result)
        }
        fileDataURL.readAsDataURL(file);
        setAvatar(file)
    }
    const saveHandler = () => {
        if(avatar){
            const form = new FormData()
            const file = new Blob([avatar], {type: "image/jpg"})
            console.log(file)
            form.append("avatar", new Blob([avatar], {type: "image/jpg"}))
            edite(form)
                .then((res) => {
                    alert(res)
                    setIsChange(false)
                    setAvatar(null)
                })
        }else{
            alert("Загрузите изображение")
        }
    }
    const [isChange, setIsChange] = useState<boolean>(false)
    return (
        <div className={"Profile"}>
            <h2>{user?.login}</h2>
            <img alt={"avatar"} src={avatarUrl ? avatarUrl : (baseURL + user?.avatar)}/>
            <div style={{display: isChange ? "block" : "none"}}>
                <input type='file' onChange={e =>
                    e.target.files && handleChangeFile(e.target.files[0])}/>
                <button onClick={saveHandler}>Сохранить</button>
            </div>
            {isChange ? <button onClick={() => {
                    setIsChange(!isChange)
                    setAvatar(null)
                    setAvatarUrl(null)
                }}>&#10008;</button>
                : <button onClick={() => setIsChange(!isChange)}>Изменить фото профиля</button>}
        </div>
    );
};

export default ProfileModal;