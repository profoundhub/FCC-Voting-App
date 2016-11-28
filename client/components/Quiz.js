import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Quiz = React.createClass({
  render() {
    const { post, i, comments } = this.props;
    return (      
        <div className="grid-figure">

            <div className="grid-quiz-wrap">

                Quiz Me!

                <Link to={ `/view/${post.code}` }>
                    <img src={ post.display_quiz } alt={ post.question } className="grid-quiz" />
                </Link>

            </div>
        </div>
    )
  }
});

export default Quiz;
