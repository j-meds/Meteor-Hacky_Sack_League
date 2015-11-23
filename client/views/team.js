Template.team.helpers({
	isEditingTeam: function(){
		return Session.get('editedTeamId') === this._id;
	}
})

Template.team.events({
'click .delete' : function(event){
	if(this._id){
		Teams.remove({_id:this._id});
	}
},
'click .edit' : function(event){
	event.preventDefault();
	Session.set('editedTeamId', this._id);
},
'submit .edit-team': function(event){
	event.preventDefault();
	var edit = event.target.edit.value;

	if(edit){
		Teams.update({_id: Session.get('editedTeamId')}, {$set: {name: edit}});
	}
	Session.set('editedTeamId', null);
},
'click .cancel': function(event){
	event.preventDefault();
	Session.set('editedTeamId', null);
}
});