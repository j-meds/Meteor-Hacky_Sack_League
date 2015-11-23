//Create dummy teams if the DB is not populated.

Meteor.startup(function () {
  if (Teams.find().count() === 0) {
    [
      {name: "Barcelona", created: new Date(), gameIds: []},
      {name: "Real Madrid", created: new Date(), gameIds: []},
      {name: "Matt's team", created: new Date(), gameIds: []}
    ].forEach(function(team){
      Teams.insert(team);
    });

    var team1 = Teams.find().fetch()[0];
    var team2 = Teams.find().fetch()[1];

    var game = {
    	completed: false,
    	created: new Date(),
    	teams: [
    	{name: team1.name, _id:team1._id, score:0},
    	{name: team2.name, _id:team2._id, score:0}
    	]
    }

    var gameId = Games.insert(game);

    Teams.update({_id: team1._id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: team2._id}, {$addToSet: { gameIds: gameId}});

  };
});