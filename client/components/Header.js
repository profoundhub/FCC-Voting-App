import React from 'react';

const Header = React.createClass({
  render() {
    return (
      <div>
		<header>
			<p>Welcome, <span id="display-name"></span>!</p>
			<a class="menu" href="/profile">Profile</a>
			<p>|</p>
			<a class="menu" href="/logout">Logout</a>
		</header>
      </div>
    )
  }
});

export default Header;
