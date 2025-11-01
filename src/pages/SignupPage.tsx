import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ firstName, lastName, email, password });
      navigate('/checkout', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520, margin: '2rem auto' }}>
      <h2>Create your account</h2>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control" />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default SignupPage;
