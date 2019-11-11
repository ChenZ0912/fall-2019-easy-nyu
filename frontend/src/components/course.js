import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './course.css';
import NYUNavBar from "./navbar";
import Table from 'react-bootstrap/Table';
import { Container, Row } from "react-bootstrap";

class Course extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            courses: [],
        };
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        fetch('/courses/', { method: "GET" })
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
            }).then(response => {
            if (this._isMounted) {
                console.log(response[0].prof)
                this.setState({ courses: response })
            }
        });
    }
    render() {
        return (
            <div>
                <NYUNavBar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>Courses in the Database:</h1>
                    </Row>
                    <Row className="justify-content-md-center"> 
                        
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Professor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.courses.map((course, i) => (
                                    <tr>
                                        <td><Link to={"/portal/" + course._id}>{course.coursename}</Link></td>
                                        <td><Link to={"/portal/professors/" + course.prof[0]._id}>{course.prof[0].professorname}</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}
  
export default Course;
