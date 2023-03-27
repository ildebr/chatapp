import {useNavigate} from "react-router-dom"

import './Home.scss'
const Home = ({socket}) => {
    const navigate = useNavigate()


    function handleSubmit(e){
        e.preventDefault()
        var user = e.target[0].value
        var img = e.target[1].value
        localStorage.setItem('user', user)
        console.log(e.target[1].value)
        socket.emit('login', { user:user , socketId: socket.id, img: img});
        navigate('/chat')
    }

    const imgs = ['funnytongue.png','red-heade.png','default.png']
    return (
        <main className="form__container">
            
            <header className="form__container__header">
            <h1>Ingresa</h1>
            <p>Chat usando React y sockets usando node</p>
            </header>
            
            <form className="userform" onSubmit={handleSubmit}>
            <h2>Bienvenido</h2>
            <label for="username">
                <input type="text" name="username" className="username__input" placeholder="Usuario" />
                
            </label>
            <select name="icon">
                {imgs.map((img)=>{
                    return <option value={img}> {img}</option>
                })}
            </select>
            <input type="submit" value="Entrar"/>
        </form>
        </main>
    )
}

export default Home;