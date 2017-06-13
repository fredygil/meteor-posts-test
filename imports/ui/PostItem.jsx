import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class PostItem extends Component {
    handleRemove(){
        /* Removes a post using a method. It is possible only if current 
        user owns the post */
        Meteor.call('posts.remove', this.props.post._id)
    }

    /* Render a post with user email, posted date, text and a button for removing */
    render(){
        return (
            <li className="list-group-item">
                <h4 className="list-group-item-heading"> 
                    {'Post by ' + this.props.post.user.email + ' on ' + this.props.post.createdAt}
                    {this.props.isOwner ? 
                        <button type="button" className="close" aria-label="Close" onClick={this.handleRemove.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    : ''}
                </h4>
                <p className="list-group-item-text">{this.props.post.text}</p>
            </li> 
        );      
    }

}

