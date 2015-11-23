Template.games.helpers({
	t: function(){
    return Teams.find({});
  },
  games: function(){
    return Games.find({});
  }, 
  isCreatingGame: function(){
    return Session.get('isCreatingGame');
  },
  isUpdatingMatch: function(){
  	return Session.get('matchId') === this._id;
  },
  t1Score: function(){
  	return Session.get('t1Score');
  },
  t2Score: function(){
  	return Session.get('t2Score');
  }
});
    
Template.games.events({
	'click .create_match': function(event){
		event.preventDefault();
		Session.set('isCreatingGame', true);
	},
	'click .cancel_create_match': function(event){
		event.preventDefault();
		Session.set('isCreatingGame', false);
	},
	'submit .submit_match': function(event, tpl){
		event.preventDefault();

		var team1 = {
			_id: tpl.$("select[name=t1]").val(),
     		 name: tpl.$("select[name=t1] option:selected").text(),
     		 score: 0
		};
		var team2 = {
			_id: tpl.$('select[name=t2]').val(),
			name: tpl.$('select[name=t2] option:selected').text(),
			score: 0
		};

		var game = {
			created: new Date(),
			completed: false,
			teams: [team1, team2]
		}

		var gameId = Games.insert(game);

		Teams.update({_id:team1._id}, {$addToSet: {gameIds: gameId}});
		Teams.update({_id:team2._id}, {$addToSet: {gameIds: gameId}});

		Session.set('isCreatingGame', false);
	},
	// Adding and Subtracting points
	'click .update_match': function(event){
		Session.set('matchId', this._id);
		Session.set('t1Score', this.teams[0].score);
		Session.set('t2Score', this.teams[1].score);
	},
	'click .cancel_update_match': function(event){
		Session.set('matchId', null);
	},
	'click .delete_match': function(){

		if(this._id){

			var gameId = this._id;
    		var team1Id = this.teams[0]._id;
    		var team2Id = this.teams[1]._id;

			if(confirm('Are you sure want to Delete the Match?')){

				Games.remove(gameId, function(err){
					console.log('delted?');
					if(!err){
						Teams.update({_id: team1Id}, { $pull : {gameIds: gameId}});
						Teams.update({_id: team2Id}, { $pull: { gameIds: gameId}});
					};
				});
			}
		}
	},
	'click .finish_match': function(event){
		console.log(this);

		var team1 = {
			_id: this.teams[0]._id,
     		 name: this.teams[0].name,
     		 score: Session.get('t1Score')
		};
		var team2 = {
			_id: this.teams[1]._id,
     		 name: this.teams[1].name,
     		 score: Session.get('t2Score')
		};
		var updated_teams = [team1, team2];

		Games.update({_id: this._id}, {$set: {teams: updated_teams}});

		Session.set('matchId', null);
	},
	'click .add_point1': function(event){
		var current_score = Session.get('t1Score');
		Session.set('t1Score', current_score + 1);
	},
	'click .minus_point1': function(event){
		var current_score = Session.get('t1Score');
		if(current_score > 0){
		Session.set('t1Score', current_score - 1);
		}
	},
	'click .add_point2': function(event){
		var current_score = Session.get('t2Score');
		Session.set('t2Score', current_score + 1);
	},
	'click .minus_point2': function(event){
		var current_score = Session.get('t2Score');
		if(current_score > 0){
		Session.set('t2Score', current_score - 1);
		}
	}
})