import React, {useState} from 'react';

function Signup({ goToLogin }: { goToLogin: (showLogin: boolean) => void }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signupResponse, setSignupResponse] = useState("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleClick = () => {
        goToLogin(true)
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
        <form className="loginAndSignupForm" onSubmit={handleSubmit}>
            <h1 className="loginsignuptitle">Create account</h1>
            <input className="loginAndSignUpInput" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required></input>
            <input className="loginAndSignUpInput" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required></input>
            <button className="btn" id="signupbtn">Create</button>
            <p>{signupResponse}</p>
            <a className="loginsignupswitch" onClick={handleClick}>Already have an account?</a>
        </form>
        </div>
    )
}

export default Signup