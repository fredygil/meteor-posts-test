import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
    'posts.remove'(postId){
        check(postId, String);

        //Make sure user logged in before removing post
        if (!Meteor.userId()){
            throw new Meteor.Error('Please log in');
        }
        
        //Check if current user is the owner of the post
        const post = Posts.findOne({_id: postId});
        if (post && post.user && post.user.id != Meteor.userId()){
            throw new Meteor.Error('You cant remove posts from other users');
        }

        Posts.remove(postId);       
    }
});