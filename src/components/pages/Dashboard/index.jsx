import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <div>
        <Link to="/create-proposal">
          <button>Create proposal</button>
        </Link>
        <Link to="/list-proposal">
          <button>Vote a proposal</button>
        </Link>
        <Link to="/my-proposal">
          <button>My proposal</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard