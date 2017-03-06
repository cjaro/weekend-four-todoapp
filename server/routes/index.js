var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi', // the name of the database
  host: 'localhost', // where my database
  port: 5432, // port number for database
  max: 10, //  connections
  idleTimeoutMillis: 10000 // 10 seconds
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM "chores";', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/new', function(req, res){
  var newChore = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO chores VALUES ($1);',
        [newChore.name],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making the database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    }
  });
});

router.delete('/delete/:id', function(req, res){
  var choresID = req.params.id;
  console.log('chores id to delete', choresID);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('DELETE FROM chores WHERE id=$1;',
        [choresID],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making the database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(202);
          }
        });
    }
  });
});

// update-> /save/choresID
router.put('/done/:id', function(req, res){
  var choresID = req.params.id;
  var choresObject = req.body;
  console.log(req.body);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('UPDATE chores SET name=$1 WHERE id=$2;',
        [choresObject.title, choresID],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making the database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(202);
          }
        });
    }
  });
});

module.exports = router;
