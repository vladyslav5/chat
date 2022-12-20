import React, {useEffect, useRef, useState} from 'react';
import {sendFiles, sendMessage} from "../apis/messageApi";
import {useParams} from "react-router-dom";
import {useStore} from "../store";
import useWS from "../hook/useWS";
import FilesInput from "./FilesInput";

const AudioInput = () => {
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
            mediaRecorder.current = new MediaRecorder(stream)
        })
    }, [])
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const start = () => {
        setAudioURL(null)
        mediaRecorder?.current?.start()
        mediaRecorder.current?.addEventListener("dataavailable", (e) => {
            const blob = new Blob([e.data])
            setAudioBlob(blob)
            const audio = URL.createObjectURL(blob)
            setAudioURL(audio)
        })
    }
    const [audioURL, setAudioURL] = useState<string | null>(null)
    const stop = () => {
        mediaRecorder?.current?.stop()
    }
    const {_id} = useParams()
    const {chatStore} = useStore()
    const addMessage = (message: any) => {
        chatStore.addMessage(message.message, message.chatId)
    }
    const sendWS = useWS()
    const sendHandler = () => {
        if (audioBlob && _id) {
            const form = new FormData()
            form.append("audio", audioBlob)
            sendFiles(_id, form)
                .then((result) => {
                    chatStore.addMessage(result, _id)
                    sendWS({message: result, chatId: _id})
                })
        } else {
            alert("запишите голосовое сообщение")
        }
    }
    return (
        <div>
            <button onClick={start}>start recording</button>
            <button onClick={stop}>stop recording</button>
            {audioURL && <audio controls autoPlay src={audioURL}>
                <source src={audioURL} type="audio/mpeg"/>
                не поддеживается
            </audio>
            }
            <button onClick={sendHandler}>отправить голосовое</button>
            <FilesInput/>
        </div>
    );
};

export default AudioInput;