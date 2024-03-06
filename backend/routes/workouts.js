const express = require('express')
const Workout = require('../models/workoutModel')

const router = express.Router()

// GET all the workouts
router.get('/', (req, res) => {
    res.json('GET all the workouts')
})

// GET a single workouts
router.get('/:id', (req, res) => {
    res.json('GET a single workout')
})

// POST a new workout
router.post('/', async (req, res) => {
    
})

// UPDATE a new workout
router.patch('/:id', (req, res) => {
    res.json('UPDATE a new workout')
})

// DELETE a new workout
router.delete('/:id', (req, res) => {
    res.json('DELETE a new workout')
})

module.exports = router