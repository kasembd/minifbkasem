import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

});


Meteor.methods({
    "insertPost": function (text) {
        check(text, String);
        if (Meteor.user()) {
            Posts.insert({
                owner: Meteor.userId(),
                username: Meteor.user().profile.firstname,
                text: text,
                createdAt: new Date(),
            });
        }
    },
    "deletePost": function (delPost_id) {

        var post = Posts.findOne({_id:delPost_id});

        if (Meteor.user()){
            console.log(Meteor.userId());
            console.log(post.owner);
              if(Meteor.userId() === post.owner)
                Posts.remove({_id:delPost_id});

        }
    }
})




