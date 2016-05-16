import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
var currentUser = Meteor.userId();
Session.set("currenUser",currentUser);
Template.navbar.helpers({
    "getUsername" : function () {

        if (Meteor.user()){
            var user = Meteor.user().profile;
             if (user) {
                 return user.firstname;
             }
        }
        else {
            return "NONE";
        }
    }

});


Template.addPost.events({
    "submit .js-add-post": function (event) {
        event.preventDefault();
     var text = $("#posttext").val();

        if (text){// not Empty text field
        Meteor.call("insertPost",text);
    }
    }
});



Template.posts.helpers({
"posts" : function () {

    return Posts.find({},{sort : {createdAt : -1}})
}

});

Template.posts.events({
   "click .glyphicon-remove" : function () {
       var delPost_id = this._id;

       if(Meteor.user()) {
         $("#"+ delPost_id).hide("slow", function () {

             Meteor.call("deletePost",delPost_id);
         })

       }
   }

});
