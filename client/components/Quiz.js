import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Quiz = React.createClass({
  render() {
    const { post, i, comments } = this.props;
    return (      
        <div className="grid-quiz-wrap">

            <div className="quiz-wrap">

                Quiz Me!

            </div>
        </div>
    )
  }
});

export default Quiz;
