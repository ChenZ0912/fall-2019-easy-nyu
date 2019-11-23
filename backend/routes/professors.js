const router = require('express').Router();
let Professor = require('../models/professor.model');

// create professor 
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const courses = req.body.courses;
    const comments = req.body.comments;
    const newProfessor = new Professor({
        name,
        courses,
        comments
    });

    newProfessor.save((err, prof) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log("Professor added!", prof.name)
            res.json({message: "Professor added!", prof: prof});
        }
    })
});

// // Get All Professor
// router.route('/all').get((req, res) => {
//     Professor.find({}, (err, data) => {
//         if (err) {
//             res.status(400).json('Error: ' + err)
//         } else {
//             res.json(data);
//         }
//     })
// });

// Get All Professor
router.route('/all').get((req, res) => {
    Professor.find()
    .populate('course_id')
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.json(data);
        }
    })
});

// // Get Prof info by Professor id
// router.route('/:id').get((req, res) => {
//     Professor.findOne({ _id: req.params.id }, (err, data) => {
//         if (err) {
//             res.status(400).json('Error: ' + err)
//         } else {
//             res.json(data);
//         }
//     })
// });

// Get Prof info by Professor id
router.route('/').get((req, res) => {
    Professor.findOne({ _id: req.query.id })
    .populate('course_id')
    .exec((err, data) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        } else {
            res.json(data);
        }
    })
});

module.exports = router;
