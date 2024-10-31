import { Link } from "react-router-dom"
import WebSocketComponent from "./WebSocketComponent"

function ProblemsList () {
    return(
        <div>
        <h1>Problem Lista</h1>
        <ul id="problemlistul">
          <li>
            <Link to="/problem1">Problem 1: Addera</Link>
          </li>
          <li>
            <Link to="/problem2">Problem 2: Summan av lista</Link>
          </li>
          <li>
            <Link to="/problem3">Problem 3: Ta bort dubbletter</Link>
          </li>
          <li>
            <Link to="/problem4">Problem 4: Näst största talet</Link>
          </li>
          <li>
            <Link to="/problem5">Problem 5: Lista av unika summor</Link>
          </li>
          <li>
            <Link to="/problem6">Problem 6</Link>
          </li>
          <li>
            <Link to="/problem7">Problem 7</Link>
          </li>
        </ul>
        <Link id="leaderboardlink" to="/leaderboard">hur många poäng har andra användare?</Link>
        <WebSocketComponent></WebSocketComponent>
      </div>
    )
}

export default ProblemsList