import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor'; 
import { Posts } from '../api/posts.js';

export default class Post extends Component {
    savePost(){
        /* Saves a post directly on DB. Note that user is an object with email and id */
        const text = ReactDOM.findDOMNode(this.refs.text).value.trim();
        Posts.insert({
            createdAt: new Date(),
            text: text,
            user: {
                email: Meteor.user().emails[0].address,
                id: Meteor.userId()
            } 
        });
        ReactDOM.findDOMNode(this.refs.text).value = '';
    }

    render(){
        return (
            <div className="col-md-12">
                <div className="panel panel-primary">
                    <div className="panel-heading"><h3>New Post</h3></div>
                    <div className="panel-body">
                        <textarea className="form-control" rows="6" ref="text"></textarea>
                    </div>
                    <div className="panel-footer">
                        <p className="text-right">
                            <button type="button" className="btn btn-primary" 
                                    onClick={this.savePost.bind(this)}>Save</button>
                        </p>
                    </div>                      
                </div>
            </div>
        );
    }
}