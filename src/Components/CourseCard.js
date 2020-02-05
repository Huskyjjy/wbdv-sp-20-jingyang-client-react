import React from "react";
import {updateCourse} from "../services/CourseService";
import './style.css'

class CourseCard extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        editing: false,
        course: this.props.course
    }
    render(){
        return(
            <div className="card" styles={{width: '18rem'}}>
                <img className="card-img-top"
                    src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    <div>
                        <span className="wbdv-icon"><i className="fa fa-file"></i></span>
                        <span className="wbdv-title">
                            {!this.state.editing &&
                                <a href="#" onClick={this.props.showCourseEditor}>
                                {this.state.course.title}
                                </a>
                            }
                            {this.state.editing &&
                            <input
                                onChange={(e) => this.setState({
                                    course: {
                                        ...this.state.course,
                                    title: e.target.value
                                    }
                                    })
                                }
                                value={this.state.course.title}
                            />
                            }
                        </span>
                    </div>
                    <div>
                        <span className="wbdv-owner">me</span>
                        <span className="wbdv-time"><time>2/5/2020</time></span>
                    </div>
                    <div>
                    <div className="inner">
                    <button onClick={() => this.props.deleteCourse(this.props.course)}>
                        <i className="fa fa-trash"></i>
                    </button>
                    </div>
                    <div className="inner">
                    <button onClick={() => this.setState({editing: true})}>
                    <i className="fa fa-pencil"></i>
                    </button>
                    </div>
                    <div className="inner">
                    <button onClick={(e) => {
                        updateCourse(this.state.course._id, this.state.course).then(status => {})
                        this.setState({
                            editing: false
                        })
                    }}>
                    <i className="fa fa-save"></i>
                    </button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseCard