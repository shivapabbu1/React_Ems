import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  // Function to generate an array of spans with blue color for each character
  const renderColorfulText = (text) => {
    return (
      <span style={{ color: '#1E90FF' }}>{text}</span>
    );
  };

  return (
    <div className="container">
      <section className="hero d-flex  ">
        <div className="hero-content text-center py-5">
          <h4>Hello...{isAuthenticated && user.name}</h4>
          <h2 className='d-flex justify-content-center align-items-center'>Welcome to  {renderColorfulText('DevDolphins')} </h2>
         
        </div>
      </section>
    </div>
  );
};

export default Home;
