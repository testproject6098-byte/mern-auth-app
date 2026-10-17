import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/verify-otp',
        { email, otp }
      );
      // Token save karo
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('✅ Login successful!');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Kuch masla ho gaya'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📧 OTP Verify</h1>
        <p style={styles.subtitle}>Aapke email par 6-digit code bheja gaya</p>
        <p style={styles.emailShow}>{email}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Verify kar rahe hain...' : 'Verify karein'}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.backLink} onClick={() => navigate('/')}>
          ← Wapas Login par jayein
        </p>
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
    maxWidth: '400px'
  },
  title: {
    margin: '0 0 10px 0',
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: '10px'
  },
  emailShow: {
    textAlign: 'center',
    color: '#667eea',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '15px',
    fontSize: '24px',
    textAlign: 'center',
    letterSpacing: '8px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    marginBottom: '15px',
    boxSizing: 'border-box',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  message: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#333'
  },
  backLink: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default VerifyOtp;