import React, {useState} from 'react';

function Login({ goToSignup, onLogin }: { goToSignup: (showSignup: boolean) => void, onLogin: (id: string) => void }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginResponse, setLoginResponse] = useState("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleClick = () => {
        goToSignup(false)
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
            setLoginResponse(data.message)
            if(data.success) {
                onLogin(data.userId)
            }
        })
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required></input>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required></input>
            <button>Login</button>
            <p>{loginResponse}</p>
        </form>
        <a onClick={handleClick}>Don't have an account?</a>
        </>
    )
}

export default Login