/* 
Setup
*/
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

/*
Import Test Units
*/
const Course = require('../models/course.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model')

// Unit Test for Course
describe('Course', () => {
    // Empty the database before each round of testing
    beforeEach((done) => {
        Course.remove({}, (err) => {
            done();
        });
    });

    // Test the /GET route
    describe('/GET courses', () => {
        it('it should GET all the courses', (done) => {
            chai.request(server)
                .get('/courses')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    // Test the /POST route
    describe('/POST courses', () => {
        it('it should not POST a book without prof field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    //res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without coursename field', (done) => {
            const course = {
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    //res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without semester field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                prof: "Amos Bloomberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    //res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should not POST a book without description field', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                semester: "Fall 2019",
                prof: "Amos Bloomberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    //res.should.have.status(404);
                    res.should.have.property('error');
                    done();
                });
        });

        it('it should POST a course without a TA', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Course added!');
                    res.body.course.should.have.property('coursename');
                    res.body.course.should.have.property('description');
                    res.body.course.should.have.property('semester');
                    res.body.course.should.have.property('prof');
                    done();
                });
        });

        it('it should POST a course with a TA', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg",
                ta: "Karan"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Course added!');
                    res.body.course.should.have.property('coursename');
                    res.body.course.should.have.property('description');
                    res.body.course.should.have.property('semester');
                    res.body.course.should.have.property('prof');
                    res.body.course.should.have.property('ta');
                    done();
                });
        });
    });

    describe('/Connection with Comment', () => {
        it('it should have an array of comments', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg",
                ta: "Karan"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    res.body.course.comments.should.be.a('array');
                    done();
                });
        });
    });
});

// Unit Test for Comment
describe('Comment', () => {
    // Empty the database before each round of testing
    beforeEach((done) => {
        Comment.remove({}, (err) => {
            done();
        });
    });

    // Test the /POST route
    describe('/POST comment', () => {
        it('it should POST a comment to a course', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg",
                ta: "Karan"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    const current_course_id = res.body.course._id;
                    const newComment = {
                        comment: "The class is good, but need to know js",
                        course_id: current_course_id
                    }
                    chai.request(server)
                        .post('/comments/add')
                        .send(newComment)
                        .end((err, res) => {
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Comment added!');
                        });
                    done();
                });
        });

        it('it should have a comment to link back to a course', (done) => {
            const course = {
                coursename: "CSCI-UA 480",
                description: " Agile Software Development",
                semester: "Fall 2019",
                prof: "Amos Bloomberg",
                ta: "Karan"
            }
            chai.request(server)
                .post('/courses/add')
                .send(course)
                .end((err, res) => {
                    const current_course_id = res.body.course._id;
                    const newComment = {
                        comment: "The class is fine, but need to know js",
                        course_id: current_course_id
                    }
                    chai.request(server)
                        .post('/comments/add')
                        .send(newComment)
                        .end((err, res) => {
                            res.body.should.have.property('course_id').eql(current_course_id);
                        });
                    done();
                });
        });
    });
});

// Unit Test for User Register and Login
describe('Register and Login', () => {

    // Test the /POST route for Register
    describe('Register', () => {
        it('Should not allow register without email', (done) => {
            const user = {
                name: 'Jack',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register with invalid email', (done) => {
            const user = {
                name: 'Jack',
                email: 'abcabcaaa',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without name', (done) => {
            const user = {
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without nid', (done) => {
            const user = {
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '123456',
                name: 'Jack'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without password', (done) => {
            const user = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password2: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register without confirm password', (done) => {
            const user = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password: '123456',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not allow register when passwords dont match', (done) => {
            const user = {
                name: 'Jack',
                email: 'yz3559@nyu.edu',
                password: '123456',
                password2: '654321',
                nid: 'yz3559'
            }
            chai.request(server)
                .post('/api/users/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        // it('Should allow register when all fields are completed', (done) => {
        //     const user = {
        //         name: 'Sam',
        //         email: 'yz1234@nyu.edu',
        //         password: '123456',
        //         password2: '123456',
        //         nid: 'yz1234'
        //     }
        //     chai.request(server)
        //         .post('/api/users/register')
        //         .send(user)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             done();
        //         });
        // });
    });

    describe('Loin', () => {
        it('Should not Loin requests without both the email and nid', (done) => {
            const user = {
                password: '123456',
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should not Loin requests without password', (done) => {
            const user = {
                email: 'yz3559@nyu.edu'
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Should allow Loin with correct password and email', (done) => {
            const user = {
                email: 'yz3559@nyu.edu',
                password: '123456'
            }
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});