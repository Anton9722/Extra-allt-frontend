import { Link } from "react-router-dom"

function ProblemsList () {
    return(
        <div>
        <h1>Problems List</h1>
        <ul>
          <li>
            <Link to="/problem1">Problem 1</Link>
          </li>
          <li>
            <Link to="/problem2">Problem 2</Link>
          </li>
          <li>
            <Link to="/problem3">Problem 3</Link>
          </li>
          <li>
            <Link to="/problem4">Problem 4</Link>
          </li>
          <li>
            <Link to="/problem5">Problem 5</Link>
          </li>
          <li>
            <Link to="/problem6">Problem 6</Link>
          </li>
          <li>
            <Link to="/problem7">Problem 7</Link>
          </li>
        </ul>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    )
}

export default ProblemsList