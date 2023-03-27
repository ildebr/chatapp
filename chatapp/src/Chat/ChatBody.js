import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({socket}) => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([]);

    const handleLeave = () =>{
        
        console.log('here')
        socket.emit('disconnectChat', {socketId:socket.id, user:localStorage.getItem('user')})
        localStorage.removeItem('user')
        navigate('/')
    }

    useEffect(()=> {
        socket.on('messageResponse', (data) => {setMessages((prev) => {return [...messages, data]})})
        console.log(messages)

        var hero =document.querySelector('.hero');

        hero.scrollTo(0,hero.scrollHeight)
        console.log(hero)

        return function cleanup() {
            socket.removeListener("messageResponse");
          };
    }, [socket,messages])

    const handleToggle = (e) => {
        var ele = document.querySelector('.chat_bar')
        ele.classList.toggle('chat_bar--active')
    }

    return (
        <div className="chat__body">
            <header className="chat__body__header">
                <button className="leave__chat" onClick={handleLeave}>	&larr; Leave chat</button>
                <img onClick={(e)=>{handleToggle(e)}} className="hamburger__bars" src="menu-bars-svgrepo-com.svg" />
            </header>

            <div className="chat__body__message__chat__container">

                <div className="hero">
                    <p>Send a message!</p>
                    {
                        messages.map((message) => {
                            return <div className={localStorage.getItem('user') == message.name ? 'message sender' : 'message receiver'}>
                                <h5 className="message_header">
                                    {message.name}
                                </h5>
                                <div className="message__content">
                                {message.text}
                                </div>
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatBody;