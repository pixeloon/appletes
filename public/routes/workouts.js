// const express = require('express');
// const router = express.Router();


// router.get('/', function(req, res) {
//   knex('workouts').then(function(workouts) {
//     res.send(workouts);
//   }).catch(function(err) {
//     res.send(err);
//   });
// });

// router.get('/:id', function(req, res) {
//   knex('workouts')
//     .where({id: req.params.id})
//     .first()
//     .then(function(workout) {
//       res.send(workout);
//     }).catch(function(err) {
//       res.send(err);
//     })
// })

// router.post('/', function(req, res) {
//   knex('workouts').insert(req.body.workout, '*').then(function(workout) {
//     res.send(workout);
//   }).catch(function(err) {
//     res.send(err);
//   });
// });

// router.delete('/:id', function(req, res) {
//   knex('workouts').where('id', req.params.id).first().del().then(function() {
//     res.send("workout Deleted!");
//   }).catch(function(err) {
//     res.send(err);
//   });
// });

// router.put('/:id', function(req, res) {
//   knex('workouts')
//     .where('id', req.params.id)
//     .update(req.body.workout)
//     .then(function() {
//       res.send("workout Updated!")
//     }).catch(function(err) {
//       res.send(err);
//     });
// });

module.exports = router;