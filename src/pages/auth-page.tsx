import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export default function AuthPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="auth-page fullscreen center-children">
      <h3>Welcome, Log in to get started</h3>
      <div style={{ height: 32 }} />
      <button
        className="opus-button opus-button--blue "
        onClick={loginWithRedirect}
      >
        Log in <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
}
