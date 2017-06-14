import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    // Posts sorted by date 
    Meteor.publish('posts', function postsPublication() {
        return Posts.find({}, {sort: {createdAt: 1}});
    });
}

Meteor.methods({
    'posts.remove'(postId){
        check(postId, String);

        //Make sure user logged in before removing post
        if (!this.userId){
            throw new Meteor.Error('Please log in');
        }
        
        //Check if current user is the owner of the post
        const post = Posts.findOne({_id: postId});
        if (post && post.user && post.user.id != this.userId){
            throw new Meteor.Error('not-authorized', 'You cant remove posts from other users');
        }

        Posts.remove(postId);       
    }
});