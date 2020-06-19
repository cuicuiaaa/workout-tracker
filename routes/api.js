const path = require("path");
const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/index.html"))
  })
  
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/exercise.html"))
  })
  
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/stats.html"));
  });
  
  app.get("/api/workouts", (req, res) => {
      db.Workout.find({})
      .then(dbWorkouts => {
        
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.put("/api/workouts/:id", (req, res) => {
    const newExercise = req.body;
    const workoutId = req.params.id;
    db.Workout.find({_id: workoutId})
    .then(workout => {
      
      let exercises = workout[0].exercises;
      exercises.push(newExercise);
      console.log(exercises);
      db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function (err, res) {
        if(err){
          console.log(err)
        }
        
      })
    })
  });

  app.post("/api/workouts", (req, res) => {
    const newWorkout = req.body;
    db.Workout.create(newWorkout)
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  })
};
