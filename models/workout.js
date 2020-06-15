const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Enter a type for exercise"
    },
    name: {
        type: String,
        trim: true,
        required: "Enter a name for exercise"
    },
    duration: {
        type: Number,
        required: "Enter the duration for exercise"
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    },
    distance: {
        type: Number
    }
});


const workoutSchema = new Schema({
    day: {
        type: Date,
        defalt: Date.now
    },
    exercises: [exerciseSchema]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;