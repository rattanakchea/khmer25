var express = require('express');
var router = express.Router();

//Job Model ORM
var Job = require('../models/job');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get about page
router.get('/about', function(req, res){
	res.json({
		'message': 'this is about page!'
	});
});
//add a job
// Get all jobs
router.get('/addJob', function(req, res){
	var job = new Job({title: "Developer",
						description: "web dev"});
	job.save(function(err, job){
		if (err){
			res.status(500).json({
				'status': 500,
				'message': 'Internal Error!'
			});
			return;
		}

		res.json({
			'Job': job,
			'success':'susccess'
		});
	});

});

// Get all jobs
router.get('/jobs', function(req, res){
	Job.find(function(err, jobs){
		if (err) {

		} else {
			res.json(jobs);
		}
	});
});

module.exports = router;
