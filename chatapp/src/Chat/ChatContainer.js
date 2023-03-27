import ChatBody from "./ChatBody"
import ChatInput from "./ChatInput"
import ChatUsersBar from "./ChatUsersBar"

import "./Chat.scss"


const ChatContainer = ({socket}) =>{
    return (
        <div className="chat">
            <ChatUsersBar socket={socket} />


            <main className="chat__mainsection">
                <ChatBody socket={socket} />
                <ChatInput socket={socket} />
            </main>
        </div>
    )
}

export default ChatContainer;