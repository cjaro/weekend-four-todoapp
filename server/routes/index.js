var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi', // name of  database
  host: 'localhost', // where my database
  port: 5432, // port number for database
  max: 10, //  connections
  idleTimeoutMillis: 10000 // 10 seconds
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM "chores";', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('error making get database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
      console.log('router.get error connecting to database: ', errorConnectingToDatabase);
    }
  });
});

//SOMETHING is wrong here but I cannot figure out What
//console kicks back a 500 error when I submit a new chore and it isn't added to the list.
// needs improvement...

router.post('/new', function(req, res){
  var newChore = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO chores (name) VALUES ($1);',
      //constant terminal error message: error: bind message supplies 1 parameters, but prepared statement "" requires 2
      // when I edited and updated my table, I got this error instead:
      // error: null value in column "id" violates not-null constraint
        [newChore.name],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('error making post database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
        console.log('router.post error connecting to database: ', errorConnectingToDatabase);
    }
  });
});

router.delete('/delete/:id', function(req, res){
  var choresID = req.params.id;
  console.log('chores id to delete', choresID);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('DELETE FROM chores WHERE id=$1;',
        [choresID],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('error making delete database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(202);
          }
        });
        console.log('router.delete error connecting to database: ', errorConnectingToDatabase);
    }
  });
});

router.put('/save/:id', function(req, res){
  var choresID = req.params.id;
  var choresObject = req.body;
  console.log(req.body);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('UPDATE chores SET name=$1 WHERE id=$2;',
        [choresObject.name, choresID],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('error making put database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(202);
          }
        });
        console.log('router.put error connecting to database: ', errorConnectingToDatabase);
    }
  });
});

module.exports = router;
