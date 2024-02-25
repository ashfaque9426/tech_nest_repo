import React from 'react';
import LoginFormComponent from '../_components/client/LoginFormComponent';

export const metadata = {
  title: 'TechNest/Login',
  description: 'This isTechNest Shop login page.',
}

function Login() {
  return (
    <section role='main' aria-labelledby='subMainContentLabel'>
      <LoginFormComponent />
    </section>
  )
}

export default Login;