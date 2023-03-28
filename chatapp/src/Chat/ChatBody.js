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