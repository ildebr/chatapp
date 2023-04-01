import { useState } from "react"

const ChatInput = ({socket}) => {

    const [message, setMessage] = useState('')

    const handleMessage = async (e) => {
        e.preventDefault()
        console.log({user: localStorage.getItem('user'), message })


        if(localStorage.getItem('user')){
            await socket.emit('privateMessage',{
                text: message,
                user: localStorage.getItem('user'),
                img: localStorage.getItem('img'),
                room: localStorage.getItem('room'),
                id: Math.random()*1000,
                socketid: socket.id
            })
        }

        setMessage('');
    }
    

    return (
        <div className="chat__input">
            <form className="chat__form" onSubmit={handleMessage}>
                <input type="text" placeholder="Write a message" value={message} onChange={(e) => {setMessage(e.target.value)}} className="message__text" />
                {/* <input type="submit" value="Send" /> */}
                <button>
                    <img src="send-svgrepo-com.svg" />
                </button>
            </form>
        </div>
    )
    
}
export default ChatInput;