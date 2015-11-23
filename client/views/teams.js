Template.teams.helpers({
	isCreatingTeam: function(){
    return Session.get('isCreatingTeam');
  },
    teams: function(){
      return Teams.find({});
    }
});
Template.teams.events({
	'click .cancel': function(event){
		event.preventDefault()
		Session.set('isCreatingTeam', false);
	},
	'click .create': function(event){
		event.preventDefault()
		Session.set('isCreatingTeam', true);
	},
	'submit .create-team' : function(event){
		event.preventDefault();

		var teamName = event.target.name.value;

		if(teamName){
			Teams.insert({name: teamName, created: new Date()}, function(err, _id){
				if(err){
					alert(err);
					Session.set('isCreatingTeam', true);
					event.target.name.value = teamName;
				}
			});
		}
		
		Session.set('isCreatingTeam', false);
	}
})