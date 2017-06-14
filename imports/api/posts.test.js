import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Posts } from './posts.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

/* 
    Server tests:

    1. User can delete an owned post
    2. User can't delete a post from other user
    3. Posts are ordered by date
*/

if (Meteor.isServer) {
    describe('Posts', function() {
        describe('methods', function() {
            const userId = Random.id();
            const otherUserId = Random.id();
            let postId, otherPostId;

            beforeEach(function() {
                Posts.remove({});
                postId = Posts.insert({
                    text: 'test post',
                    createdAt: new Date(),
                    user: {
                        id: userId,
                        email: 'test@test.com'
                    }
                });
                otherPostId = Posts.insert({
                    text: 'test post 2',
                    createdAt: new Date(),
                    user: {
                        id: otherUserId,
                        email: 'test2@test.com'
                    }
                });
            });            
            it('can delete owned post', function() {
                const deletePost = Meteor.server.method_handlers['posts.remove'];
                const invocation = { userId };
                deletePost.apply(invocation, [postId]);
                assert.equal(Posts.find({'user.id': userId}).count(), 0);
            });
            it('can\'t delete post from other user', function() {
                assert.throws(function() {
                    const deletePost = Meteor.server.method_handlers['posts.remove'];
                    const invocation = { userId };
                    deletePost.apply(invocation, [otherPostId]);
                }, Meteor.Error, /not-authorized/); 
            });
        });
    });

    describe('Publications', function(){
        describe('posts', function () {
            const userId = Random.id();
            let localPosts = [];

            beforeEach(function() {
                Posts.remove({});
                resetDatabase();

                for (let i=0; i <= 9; i++){
                    localPosts.push({
                        text: 'test post',
                        createdAt: new Date(),
                        index: i,
                        user: {
                            id: userId,
                            email: 'test@test.com'
                        }
                    });
                    Posts.insert(localPosts[i]);
                }
            }); 

            it('order posts by date', function (done) {
                const collector = new PublicationCollector();
                collector.collect('posts', function(collections) {
                    assert.typeOf(collections.posts, 'array');
                    assert.deepEqual(collections.posts, Posts.find({}, {sort: {index: 1}}).fetch());
                    done();
                });
            });
        });
    });    
}

/* 
    Client tests:

    1. A user can insert a post directly from the client
*/


if (Meteor.isClient) {
    describe('Posts', function() {
        describe('methods', function() {
            const userId = Random.id();
            let postId;

            beforeEach(function() {
                resetDatabase();
            });

            it('can insert a post without a server call', function() {
                postId = Posts.insert({
                    text: 'test post',
                    createdAt: new Date(),
                    user: {
                        id: userId,
                        email: 'test@test.com'
                    }
                });
                assert.equal(Posts.find({_id: postId}).count(), 1);
            });
        });
    });
}