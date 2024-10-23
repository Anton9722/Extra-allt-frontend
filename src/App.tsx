import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { SetStateAction, useState } from 'react';
import ProblemsList from './components/ProblemsList';

function App() {

  const [showLoginOrSignupComponent, setShowLoginOrSignupComponent] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState("");

  const handleLogin = (id: SetStateAction<string>) => {
    setAccountId(id)
    setIsLoggedIn(true)
    console.log(accountId);
    
  }

  const changeBetweenLoginAndSignup = (loginOrSignup: any) => {
    setShowLoginOrSignupComponent(loginOrSignup)
  }

  return (
    <div>
      {!isLoggedIn && showLoginOrSignupComponent && (
        <>
          <Login goToSignup={changeBetweenLoginAndSignup} onLogin={handleLogin}/>
        </>
      )}
      {!isLoggedIn && !showLoginOrSignupComponent && (
        <>
          <Signup goToLogin={changeBetweenLoginAndSignup}/>
        </>
      )}
    {isLoggedIn && 
    <ProblemsList/>
    }
    </div>
  )
}

export default App
