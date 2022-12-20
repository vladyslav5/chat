import React, {useState} from 'react';
import Modal from "./Modal/Modal";
import useWS from "../hook/useWS";
import {useParams} from "react-router-dom";
import {sendFiles} from "../apis/messageApi";
import {useStore} from "../store";

const FilesInput = () => {
    const [active, setActive] = useState<boolean>(false)
    const onHide = (b: boolean) => {
        setActive(b)
    }
    const sendWS = useWS()
    const [filesURL, setFilesURL] = useState<string[]>([])
    const [files, setFiles] = useState<FileList | null>()
    const {_id} = useParams()
    const {chatStore} = useStore()
    const sendHandler = () => {
        if (!files) {
            alert("выберете файлы")
        } else if (_id) {
            console.log(files)
            const formData = new FormData();
            [].forEach.call(files, (file, index) => formData.append(index.toString(), file))
            sendFiles(_id, formData)
                .then((result) => {
                    console.log(result, "res")
                    chatStore.addMessage(result, _id)
                    sendWS({message: result, chatId: _id})
                }).finally(()=>{
                    setFiles(null)
                    setFilesURL([])
                    onHide(false)
            })
        }

    }
    return (
        <div>
            <button onClick={() => setActive(true)}>files</button>
            <Modal active={active} onHide={onHide}>
                <div
                    style={{maxHeight: window.innerHeight - 300, overflowY: "auto"}}
                >
                    {filesURL && filesURL.map((fileURL) =>
                        <img key={fileURL} alt={"files"} style={{
                            height: "100px",
                            width: "100px",
                            margin: "5px",
                            border: 'blue 5px solid'
                        }}
                             src={fileURL}
                        />)}
                    <input type="file" multiple onChange={async (e) => {

                        const filesPromises = [].map.call(e.target.files, file => {
                            const reader = new FileReader()
                            return new Promise(resolve => {

                                reader.onload = (e) => {
                                    e.target && resolve(e.target.result)
                                };
                                reader.readAsDataURL(file);
                            });
                        });
                        let res = await Promise.all(filesPromises)
                        setFiles(e.target.files)
                        setFilesURL(res as string[])
                    }}/>
                    <button onClick={sendHandler}>отправить</button>
                </div>
            </Modal>
        </div>
    );
};

export default FilesInput;