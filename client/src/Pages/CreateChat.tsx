import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from "../Components/Modal/Modal";
import {createChat} from "../apis/chatApi";
import {useStore} from "../store";

const CreateChat = () => {
    const [active, setActive] = useState<boolean>(true)
    const history = useNavigate()
    const [fileURL, setFileURL] = useState<any>()
    const [file, setFile] = useState<any>()
    const [chatName, setChatName] = useState<string>("")
    const handleChangeFile = (file: any) => {
        let fileDataURL = new FileReader()
        fileDataURL.onloadend = (e) => {
            e.target && setFileURL(e.target.result)
        }
        fileDataURL.readAsDataURL(file);
        setFile(file)

    }
    const {chatStore} = useStore()
    const createHandler = () => {
        if (chatName && file) {
            const data = new FormData()
            data.append('name', chatName)
            data.append("avatar", new Blob([file], {type: "image/jpg"}))
            createChat(data)
                .then((res) => {
                    alert("успешно создано")
                    chatStore.addChat(res)
                    history(-1)
                })
        } else {
            alert("введите все данные")
        }
    }
    return (
        <Modal active={active} onHide={(bol: boolean) => {
            setActive(bol)
            history(-1)
        }}>
            <div className={"createChat_modal"}>
                <h2>Создать чат</h2>
                <input
                    value={chatName}
                    onChange={e => setChatName(e.target.value)}
                    placeholder={"название чата"}
                />
                <input type="file" onChange={e =>
                    e.target.files && handleChangeFile(e.target.files[0])}/>
                {(chatName || fileURL) && <form>
                    <img src={fileURL}/>
                    <label>{chatName}</label>
                </form>}
                <button onClick={createHandler}>Создать</button>
            </div>
        </Modal>
    );
};

export default CreateChat;