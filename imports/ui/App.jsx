import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor'; 
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts.js';
import Post from './Post.jsx';
import PostItem from './PostItem.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
    // Render a PostItem component for each save post 
    renderPosts(){
        return this.props.posts.map( post => {
            {/* isOwner is true if current user owns the post */}
            const isOwner = post.user.id === (this.props.currentUser && this.props.currentUser._id);
            return (<PostItem key={post._id} post={post} isOwner={isOwner}/>)
        });
    }

    // Main component. It renders a header, a post area and list of posts
    render(){
        return (
            <div className="container">
                <div className="page-header">
                    <h1>Posts System <small><AccountsUIWrapper /></small></h1>
                </div>
                {/* Post area is enabled only if there is a user logged in  */}
                {this.props.currentUser ?
                    <div className="row">
                        <Post />
                    </div>
                : ''}
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading"><h3>Posts History</h3></div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {this.renderPosts()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default createContainer(() => {
    return {    
        /* Posts sorted by date */  
        posts: Posts.find({}, {sort: {createdAt: 1}}).fetch(),
        /* Logged in user */
        currentUser: Meteor.user()
    };
}, App);