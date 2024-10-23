import React, {useState} from 'react';

function Signup() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signupResponse, setSignupResponse] = useState("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let newAccount = {
            username: username,
            password: password
        }

        fetch("https://goldfish-app-9c2tv.ondigitalocean.app/user/create", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount)
        })
        .then(res => res.text())
        .then(message => {
            console.log(message);
            setSignupResponse(message)
        })
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h3>Create account</h3>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required></input>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required></input>
            <button>Create</button>
        </form>
        <p>{signupResponse}</p>
        </div>
    )
}

export default Signup