import React, {useEffect, useState} from 'react';
import {getContact} from "../apis/userApi";
import ContactItem from "../Components/ContactItem";
import Modal from "../Components/Modal/Modal";
import {useLocation, useNavigate} from "react-router-dom";
import {CONTACTS_ROUTE} from "../utils/consts";

interface Contact {
    _id: string,
    avatar: string,
    login: string
}

const Contacts = () => {
    const [active, setActive] = useState<boolean>(false)
    const history = useNavigate()
    const [contacts, setContacts] = useState<Contact[] | null>(null)
    useEffect(() => {
        getContact()
            .then((res) => {
                setContacts(res.contacts)
                console.log(res)
            })
    }, [])
    return (
        <>
            <h2 onClick={() => {
                setActive(!active)
            }}>contacts</h2>
            <Modal active={active} onHide={(bol: boolean) => {
                setActive(bol)
                history(-1)
            }}>
                <div className={"Contact_wrap"}>
                    {!contacts?.length && <div>Пусто</div>}
                    {contacts?.map((contact) => <div>
                        <ContactItem user={contact}/>
                    </div>)}
                </div>
            </Modal>
        </>
    );
};

export default Contacts;