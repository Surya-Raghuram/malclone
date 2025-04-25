import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserResponse = {
  message: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const navigate = useNavigate(); // placed inside the component

  useEffect(() => {
    fetch('http://localhost:8080/profile', {
      method: 'GET',
      credentials: 'include', //  send cookies
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed: ${res.status} ${text}`);
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Session error:", err.message);
         navigate('/'); //  redirect to login if not authenticated
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>{user.message}</p>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Dashboard;
