import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({  
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Voting App</Link>
        </h1>
        
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
});

export default Main;
// { React.cloneElement({ ...this.props }.children, { ...this.props }) }