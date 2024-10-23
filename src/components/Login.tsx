import React, {useState} from 'react';

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginResponse, setLoginResponse] = useState("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let loginRequest = {
            username: username,
            password: password
        }

        fetch("https://goldfish-app-9c2tv.ondigitalocean.app/user/login",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoginResponse(data.message)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required></input>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required></input>
            <button>Login</button>
            <p>{loginResponse}</p>
        </form>
    )
}

export default Login