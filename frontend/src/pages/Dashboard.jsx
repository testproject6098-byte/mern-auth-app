import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Welcome!</h1>
        <p style={styles.subtitle}>Aap kamyabi se login ho gaye hain</p>

        <div style={styles.infoBox}>
          <p style={styles.label}>Email:</p>
          <p style={styles.value}>{user.email}</p>

          <p style={styles.label}>User ID:</p>
          <p style={styles.value}>{user.id}</p>
        </div>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '450px'
  },
  title: {
    margin: '0 0 10px 0',
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px'
  },
  infoBox: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  label: {
    color: '#999',
    fontSize: '12px',
    margin: '10px 0 5px 0',
    textTransform: 'uppercase'
  },
  value: {
    color: '#333',
    fontSize: '16px',
    margin: '0 0 10px 0',
    wordBreak: 'break-all'
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    background: '#dc3545',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default Dashboard;