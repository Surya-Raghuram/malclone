import { useEffect, useState } from 'react';

type UserResponse = {
  message: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
   fetch('/api/profile', {
        method: 'GET',
        credentials: 'include' // ensures cookies are sent with the request
        })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch session data");
    }
    return response.json();
  })
  .then(data => {
    console.log("User's session data:", data);
    // Use data.name, data.userId, etc. to update your UI dynamically
  })
  .catch(error => {
    console.error("Error fetching session data:", error);
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
