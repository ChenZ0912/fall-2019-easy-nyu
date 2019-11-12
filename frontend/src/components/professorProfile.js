import React, { Component } from "react";
import NYUNavBar from "./navbar";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './professorProfile.css';

class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this._isMounted = true;
        this.state = {
            professorname: '',
            description: '',
            comments: [],
            courses: []
        };
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        const id = 
        fetch(`/professors?id=${this.props.match.params.id}`, { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            }).then(response => {
                if (this._isMounted) {
                    this.setState(
                        {
                            professorname: response.professorname,
                            description: response.description,
                            courses: response.course_id, 
                            comments: response.comments
                        }
                    )
                }
            });
    }

    render() {
        return (
            <div>
                <NYUNavBar />
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>{`${this.state.professorname}`}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h2>{`${this.state.description}`}</h2>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <td>{`Courses taughtyed by Prof. ${this.state.professorname}`}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {console.log(this.state.courses)}
                                    {this.state.courses.map((course, i) => (
                                        <td key={i}><Link to={`//`}>{course.coursename}</Link></td>
                                    ))}
                                </tr>
                            </tbody>
                            {/* <tbody>
                                <tr>
                                    {console.log(this.state.comments)}
                                    {this.state.comments.map((comment, i) => (
                                        <td key={i}><Link to={`//`}>{comment.comment}</Link></td>
                                    ))}
                                </tr>
                            </tbody> */}
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}
  
export default ProfessorProfile;
