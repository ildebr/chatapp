import {useNavigate} from "react-router-dom"

import './Home.scss'
const Home = ({socket}) => {
    const navigate = useNavigate()


    function handleSubmit(e){
        e.preventDefault()

        var radios = document.querySelectorAll('.radio-img')
        var radios = [...radios]
        var radioSelected = radios.filter((r)=>{return r.checked == true})[0].getAttribute('data-img')
        console.log(radioSelected)
        var user = e.target[0].value
        var room = document.querySelector("[name=room]").value
        localStorage.setItem('user', user)
        localStorage.setItem('img', radioSelected)
        localStorage.setItem('room', room)
        console.log(e.target[1].value)
        socket.emit('loginChannel', { user:user, room:room , socketId: socket.id, img: radioSelected});
        navigate('/chat')
    }

    const imgs = ['default.png','funnytongue.png','red-heade.png']
    return (
        <main className="form__container">

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
            
            <header className="form__container__header">
            <h1>Conecta con amigos</h1>
            <p>Ingresa tu usuario y selecciona una imagen</p>
            <div className="pattern">
                <div className="bg"></div>
                <img src="pattern.png" /> 
            </div>
            </header>
            
            <form className="userform" onSubmit={handleSubmit}>
            <h2>Bienvenido</h2>
            <label for="username">
                
                <input type="text" name="username" className="username__input" required />
                <span className="input-placeholder">Usuario</span>
            </label>
            <label for="room">
                
                <input type="text" name="room" className="username__input" required />
                <span className="input-placeholder">Room</span>
            </label>
            <div className="radio-buttons">
                {imgs.map((img,id)=>{
                    return <label for={`radio-${id+1}`}>
                        <input type="radio" id={`radio-${id+1}`} data-img={img} name="radio-img" className="radio-img" required />
                        <img src={img} />
                    </label>
                })}
            </div>
            <input type="submit" value="Entrar"/>
        </form>
        </main>
    )
}

export default Home;