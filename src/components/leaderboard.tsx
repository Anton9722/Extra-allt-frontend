import { useEffect, useState } from 'react';

function Leaderboard({ accountId }: { accountId: string}) {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        console.log(accountId);
        fetch("https://goldfish-app-9c2tv.ondigitalocean.app/user/get-all")
        .then(res => res.json())
        .then(data => {
            setUsers(data);
        });
    }, []);

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id || user.username}><h4>{user.username} {user.points}</h4></li> 
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;