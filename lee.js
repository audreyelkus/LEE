/*eventList = new Mongo.Collection(events);
userTasks = new Mongo.Collection('userTasks');
*/
if (Meteor.isClient){
  Session.set("name", "D3");
  console.log("I'm running client code");
  
  Template.eventList.helpers({
      'event': function(){
        return eventsList;  
      },
      'selectedClass': function(){
       var eventId = this._id;
       var selectedEvent = Session.get(selectedEvent);
       if(taskId == selectedEvent){
           return "selected"
        }
       },
      'showSelectedEvent': function(){
        var selectedEvent = Session.get(selectedEvent);
        return eventsList.findOne(selectedEvent);
        } 
  });
    
  Template.eventList.events({
      'dblclick .event': function(){
        Session.set('selectedEvent', 'session value test');
        var selectedEvent = session.get('selectedEvent');
        var eventId = this._id;
        var eventName = this.name;
        Session.set('selectedEvent', eventId);
      },
  });
}

if(Meteor.isServer){
 Meteor.startup(function () {
    /* Publish allUsers list --our users-- Lee, please make sure this works--
    -By Lee*/ 
    Meteor.publish('allUsers', function(){
        var currentUserId = this.userId; //set userId;
        return userTasks.find({createdBy: currentUserId})
    });
 });
 /* Contains our meteor methods on the server side*/
 Meteor.methods({
     //Inserts data for Event into general event list - By Lee
    'insertEvent' : function(taskName){
     var currentUserId = Meteor.userId();
     events.insert({
        name: taskName,
        subscribers:[],
        createdBy: currentUserId
     });
    },
     //Will remove Event data - Lee
    'removeEvent': function(selectedTask){
     //Lee, come back to this-- you're gonna want to check to see if the
     // Task createdBy == the user id of the logged in user
    },
    'insertUserTasks': function(taskName){
        //For Audrey-- find a way to insert tasks into userTasks.
        //If you want, you can wait until Lee finishes insertEvent
        
    },
 });    
}