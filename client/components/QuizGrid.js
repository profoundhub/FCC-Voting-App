import React from 'react';
import { link } from 'react-router';
import Quiz from './Quiz';

const QuizGrid = React.createClass({
    render() {
        //
        return (
            <div>
                <h1>
                    Show List of Quiz Here!
                </h1>

                { this.props.posts.map((post, i) => <Quiz { ...this.props } key={ i } i={ i } post={ post } />) }
            </div>
        )
    }
});

export default QuizGrid;