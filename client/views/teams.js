Template.teams.helpers({
	isCreatingTeam: true,
    teams: function(){
      return Teams.find({});
    }
});
Template.teams.events({
	'submit .create-team' : function(event){
		event.preventDefault();

		var teamName = event.target.name.value;

		if(teamName){
			Teams.insert({name: teamName, created: new Date()});
		}
		console.log(teamName);
		
		event.target.name.value = '';

	}
})