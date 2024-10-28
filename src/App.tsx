import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { SetStateAction, useState } from 'react';
import ProblemsList from './components/ProblemsList';
import Problem1 from './components/Problem1'; 
import Problem2 from './components/Problem2'; 
import Problem3 from './components/Problem3';
import Problem4 from './components/Problem4';
import Problem5 from './components/Problem5';
import Problem6 from './components/Problem6';
import Problem7 from './components/Problem7';
import Leaderboard from './components/leaderboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [showLoginOrSignupComponent, setShowLoginOrSignupComponent] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState("");

  const handleLogin = (id: SetStateAction<string>) => {
    setAccountId(id);
    setIsLoggedIn(true);
    console.log(accountId);
  };

  const changeBetweenLoginAndSignup = (loginOrSignup: any) => {
    setShowLoginOrSignupComponent(loginOrSignup);
  };

  return (
    <Router>
      <div>
        {!isLoggedIn && showLoginOrSignupComponent && (
          <>
            <Login goToSignup={changeBetweenLoginAndSignup} onLogin={handleLogin} />
          </>
        )}
        {!isLoggedIn && !showLoginOrSignupComponent && (
          <>
            <Signup goToLogin={changeBetweenLoginAndSignup} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Routes>
              <Route path="/" element={<ProblemsList />} />

              <Route path="/problem1" element={<Problem1 accountId={accountId} />} />
              <Route path="/problem2" element={<Problem2 accountId={accountId} />} />
              <Route path="/problem3" element={<Problem3 accountId={accountId} />} />
              <Route path="/problem4" element={<Problem4 accountId={accountId} />} />
              <Route path="/problem5" element={<Problem5 accountId={accountId} />} />
              <Route path="/problem6" element={<Problem6 accountId={accountId} />} />
              <Route path="/problem7" element={<Problem7 accountId={accountId} />} />
              <Route path="/leaderboard" element={<Leaderboard accountId={accountId}/>} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;