var Skill = require('./models/skill');
var Project = require('./models/project');
var Goal = require('./models/goal');
var Document = require('./models/document');

module.exports = function(app) {
	app.get('/api/docs/:block/:block_id', function(req,res){
		//CHANGE TO POST AFTERWARDS!
		Document.find(
		{
			block_id: req.params.block_id
		}, function(err, data){
			if (data.length < 1)
			{	
				//Entry does not exist, create a new doc
				Document.create({
					block_id: req.params.block_id,
					block: req.params.block,
					text: ""
				},function(err, data){
					if(err)
						res.send(err);
					res.json(data);
				});
			}
			else
			{
				//Entry does exist, return entry.
				if(err)
					res.send(err);
				res.json(data);
			};
		});
	});

	app.get('/api/skills/select/:category', function(req,res){
		Skill.find(
		{
			category: req.params.category
		}, function(err, data){
			if (err)
				res.send(err)
			res.json(data);

		});
	});

	app.get('/api/goals', function(req, res){
		Goal.find(function(err,data){
			if (err)
				res.send(err);
			res.json(data)
		});
	});

	app.post('/api/docs', function(req,res){

		Document.update(
		{
			block_id: req.body.block_id
		},
		{
			block: req.body.block,
			text: req.body.text
		},
		{},
			function(err, data){
				if(err)
					res.send(err);
				Document.find(
				{
					block_id: req.body.block_id
				}, function(err,data){
					res.json(data);

				});

		});
	});

	app.post('/api/skills/update', function(req,res){
	
			updateData = req.body;
			myID = req.body._id;

			delete updateData._id;

			Skill.update({ _id: myID}, updateData, {multi:false}, function(err, data){
				if (err)
					res.send(err)
				Skill.find(function(err, data){
					if (err)
						res.send(err);
					res.json(data);
				});
			});
	});

	app.post('/api/goals', function(req, res)
	{
		Goal.create(
		{
			name: req.body.name,
			labels: req.body.labels,
			skills: req.body.skills,
			actions: req.body.actions,
			projects: req.body.projects,
			social: req.body.social,
			notes: req.body.notes,
			progress: req.body.progress,
			resources: req.body.resources
		}, function(err, data)
			{
				if (err)
					res.send(err)
				Goal.find(function(err, data)
				{
					if(err)
						res.send(err)
					res.json(data);
				});

		});
	});

	app.delete('/api/goals/:goal_id', function(req, res) {
		Goal.remove({
			_id : req.params.goal_id
		}, function(err, data) {
			if (err)
				res.send(err);
			Goal.find(function(err, data) {
				if (err)
					res.send(err)
				res.json(data);
			});
		});
	});

	app.get('/api/projects', function(req, res){
		Project.find(function(err,data){
			if (err)
				res.send(err);
			res.json(data)
		});
	});

	app.post('/api/projects', function(req, res)
	{
		Project.create(
		{
			name: req.body.name,
			labels: req.body.labels,
			skills: req.body.skills,
			actions: req.body.actions,
			goals: req.body.goals,
			notes: req.body.notes,
			progress: req.body.progress,
			resources: req.body.resources
		}, function(err, data)
			{
				if (err)
					res.send(err)
				Project.find(function(err, data)
				{
					if(err)
						res.send(err)
					res.json(data);
				});

		});
	});

	app.delete('/api/projects/:project_id', function(req, res) {
		Project.remove({
			_id : req.params.project_id
		}, function(err, data) {
			if (err)
				res.send(err);
			Project.find(function(err, data) {
				if (err)
					res.send(err)
				res.json(data);
			});
		});
	});

	app.get('/api/skills', function(req, res) {
		Skill.find(function(err, skills) {
			if (err)
				res.send(err)
			res.json(skills); 
		});
	});

	app.post('/api/skills', function(req, res) {
		Skill.create({
			name: req.body.name,
			category: req.body.category,
			sub: req.body.sub,
			path: req.body.path,
			points: req.body.points 
		}, function(err, skill) {
			if (err)
				res.send(err);
			Skill.find(function(err, skills) {
				if (err)
					res.send(err)
				res.json(skills);
			});
		});

	});

	app.delete('/api/skills/:skill_id', function(req, res) {
		Skill.remove({
			_id : req.params.skill_id
		}, function(err, skills) {
			if (err)
				res.send(err);
			Skill.find(function(err, skills) {
				if (err)
					res.send(err)
				res.json(skills);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};