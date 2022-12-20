import React, {useState} from 'react';

interface props{
    active:boolean,
    setActive:(bool:boolean)=>void
}

const Navbar = ({active,setActive}:props) => {
    const onClickDown = (event:any)=>{
        if(event.keyCode==13){
            console.log("send")
        }
    }
    return (
        <div
            className={"navbar"}
        >
            <button
                onClick={()=>setActive(!active)}
            />
            <input
                onKeyDown={onClickDown}
                placeholder={"Поиск чатов"}
            />

        </div>
    );
};

export default Navbar;