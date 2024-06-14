import React from 'react';
import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';

const Homepage = () => {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>
      <Link to="/pricing">Move to pricing</Link>
    </div>
  );
};

export default Homepage;
