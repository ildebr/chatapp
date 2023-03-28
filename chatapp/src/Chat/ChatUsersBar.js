import React, { useEffect, useState } from "react";

const ChatUsersBar = ({socket}) =>{

    const [usersList, setUsersList] = useState([]);

    useEffect(()=>{
        socket.on('usersList', (data) => setUsersList(data))
        console.log(usersList)
        usersList.map((user) =>{
            console.log(user.user)
        }) 
    }, [socket, usersList])
    const handleToggle = (e) => {
        var ele = document.querySelector('.chat_bar')
        ele.classList.toggle('chat_bar--active')
    }
    return (
        <div className="chat_bar">
            

            <div>
                <h2 className="close__user__bar" onClick={(e)=>{handleToggle(e)}}>&rarr;</h2>
                <h4>Usuarios activos</h4>
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