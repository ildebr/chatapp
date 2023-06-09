import React, { useEffect, useState } from "react";

const ChatUsersBar = ({socket}) =>{

    const [usersList, setUsersList] = useState([]);

    useEffect(()=>{
        socket.on('usersList', (data) => setUsersList(data))
        usersList.map((user) =>{
            console.log(user.user)
        }) 
    }, [socket, usersList])

    socket.on('coneccion', (data) => console.log('coneccion'))
    const handleToggle = (e) => {
        var ele = document.querySelector('.chat_bar')
        ele.classList.toggle('chat_bar--active')
    }
    return (
        <div className="chat_bar">
            

            <div>
                <h2 className="close__user__bar" onClick={(e)=>{handleToggle(e)}}>&larr;</h2>
                <div className="chat__users">
                    
                    {usersList.map((user) =>{
                        return <p className="chat__users__user"><img className="icon-img" src={user.img} /> {user.user}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChatUsersBar;