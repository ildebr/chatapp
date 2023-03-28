import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({socket}) => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([]);
    var cont = 0

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

    useEffect(()=>{
        socket.on('escribiendoRespuesta', (data) => console.log(data));
    },[socket])

    const handleToggle = (e) => {
        var ele = document.querySelector('.chat_bar')
        ele.classList.toggle('chat_bar--active')
    }

    return (
        <div className="chat__body">
            <header className="chat__body__header">
                <button className="leave__chat" onClick={handleLeave}>	&larr; Leave chat</button>
                <div className="logo-container">
                    <p>Chat</p> 
                    {/* <img src="chat-svgrepo-com.svg" /> */}
                    <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 60 60" xmlSpace="preserve">
                    <g>
                    <path d="M44.348,12.793H2.652C1.189,12.793,0,13.982,0,15.445v43.762l9.414-9.414h34.934c1.463,0,2.652-1.19,2.652-2.653V15.445
                        C47,13.982,45.811,12.793,44.348,12.793z M10,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S12.206,35.777,10,35.777z
                        M23,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S25.206,35.777,23,35.777z M36,35.777c-2.206,0-4-1.794-4-4s1.794-4,4-4
                        s4,1.794,4,4S38.206,35.777,36,35.777z" id="svg-path" />
                    <path d="M57.348,0.793H12.652C11.189,0.793,10,1.982,10,3.445v7.348h34.348c2.565,0,4.652,2.087,4.652,4.652v25.332h11V3.445
                        C60,1.982,58.811,0.793,57.348,0.793z" id="svg-path" />
                    </g>
                    </svg>
                </div>
                <img onClick={(e)=>{handleToggle(e)}} className="hamburger__bars" src="menu-bars-svgrepo-com.svg" />
            </header>

            <div className="chat__body__message__chat__container">

                <div className="hero">
                    <div className="send-sms">
                        <p>Send a message!</p>
                    </div>
                    {
                        messages.map((message,i,array) => {
                            
                            if(array[i-1]?.user != message.user){
                                console.log(true, message.text)
                                return <div data-cont={cont++} className={localStorage.getItem('user') == message.user ? 'message sender' : 'message receiver'}>
                                <h5 className="message_header">
                                    {message.user}
                                </h5>
                                <div className="message__content">
                                {message.text}
                                </div>
                                <img className="message__img" src={message.img} />
                                
                                </div>
                            }else {
                                return <div className={localStorage.getItem('user') == message.user ? 'message sender' : 'message receiver'}>
                                
                                <div className="message__content">
                                {message.text}
                                </div>
                                
                                </div>
                            }
                            
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatBody;