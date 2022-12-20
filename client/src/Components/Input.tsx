import React, {useEffect, useRef, useState} from 'react';
import AudioInput from "./AudioInput";
import {sendMessage} from "../apis/messageApi";

interface props {
    send: (s: string) => void
}

const Input = ({send}: props) => {
    const [value, setValue] = useState<string>("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (textareaRef.current != null) {
            textareaRef.current.style.height = "0px"
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }

    }, [value])
    return (
        <>
        <textarea
            spellCheck={false}
            ref={textareaRef}
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder={"написать"}
        />
            <button onClick={() => {
                send(value)
                setValue("")
            }}>отправить
            </button>
            <AudioInput/>
        </>
    );
};

export default Input;