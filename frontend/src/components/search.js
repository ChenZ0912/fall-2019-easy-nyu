import React, { Component } from "react";
import { InputGroup, FormControl } from 'react-bootstrap';
import './search.css'

class NYUNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }


    render() {
        return (
            <div className='search-div'>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search Professor/Course"
                        aria-label="Search Professor/Course"
                        aria-describedby="basic-addon2"
                        onChange={this.handleChange.bind(this)}
                    />
                </InputGroup>
            </div>
        )
    }
}

export default NYUNavBar;

