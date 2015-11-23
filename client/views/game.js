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