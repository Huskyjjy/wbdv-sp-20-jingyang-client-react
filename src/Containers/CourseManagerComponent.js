import React from "react";
import CourseTableComponent from "../Components/CourseTableComponent";
import CourseGridComponent from "../Components/CourseGridComponent";
import CourseEditor from "../Components/CourseEditor/CourseEditor";
import '../css/tablestyle.css'
import {deleteCourse, createCourse, findAllCourses} from "../services/CourseService"

class CourseManagerComponent extends React.Component {
    state = {
        layout: 'table',
        editingCourse: false,
        newCourseTitle: "New Course Title",
        courses: []
    }

    componentDidMount = async () => {

        const allCourses = await findAllCourses()
        this.setState({
            courses: allCourses
        })

        // findAllCourses()
        //     .then(courses => this.setState({
        //         courses: courses
        //     }))
    }

    deleteCourse = async (deletedCourse) => {
        const status = await deleteCourse(deletedCourse._id)
        const courses = await findAllCourses()
        this.setState({
            courses: courses
        })
        // this.setState(prevState => ({
        //     courses: prevState.courses.filter(course => course._id !== deletedCourse._id)
        // }))
    }

    toggle = () => {
        this.setState((prevState) => {
            if (prevState.layout === 'grid') {
                return {
                    layout: 'table'
                }
            } else {
                return {
                    layout: 'grid'
                }
            }
        })
    }

    showCourseEditor = () =>
        this.setState({
            editingCourse: true
        })

    hideCourseEditor = () =>
        this.setState({
            editingCourse: false
        })

    addCourse = async () =>
    {
        const newCourse = {
            title: this.state.newCourseTitle
        }
        const actualCourse = await createCourse(newCourse)
        console.log(actualCourse)
        const allCourses = await findAllCourses()
        this.setState({
            courses: allCourses
        })
        // this.setState(prevState => ({
        //     courses: [
        //         ...prevState.courses,
        //         {
        //             _id: (new Date()).getTime() + "",
        //             title: prevState.newCourseTitle
        //         }
        //     ]
        // }))
    }

    updateForm = (e) =>
        this.setState({
            newCourseTitle: e.target.value
        })

    render() {
        return (
            <div>
                {
                    this.state.editingCourse
                    && <CourseEditor hideCourseEditor={this.hideCourseEditor}/>
                }
                {!this.state.editingCourse &&
                    <div>
                        
                        <div>
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div>
                                <button>
                                    <i className="fa fa-bars"></i>
                                </button>
                
                            </div>
                            <div className="collapse navbar-collapse">
                            <label className="navbar-brand wbdv-label wbdv-course-manager wbdv-middle">Course Manager</label>
                            </div>
                            <div>
                    
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control wbdv-field wbdv-new-course" 
                                        onChange={this.updateForm}
                                        value={this.state.newCourseTitle}/>
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary wbdv-button wbdv-add-new-course" 
                                            onClick={this.addCourse}>
                                            <i className="fa fa-fw fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </nav>
                        </div>                      
                        {this.state.layout === 'table' &&
                        <CourseTableComponent
                            toggle={this.toggle}
                            showCourseEditor={this.showCourseEditor}
                            deleteCourse={this.deleteCourse}
                            courses={this.state.courses}/>}
                        {this.state.layout === 'grid' && 
                        <CourseGridComponent 
                            toggle={this.toggle}
                            showCourseEditor={this.showCourseEditor}
                            deleteCourse={this.deleteCourse}
                            courses={this.state.courses}
                        />}
                    </div>
                }
            </div>
        )
    }
}

export default CourseManagerComponent
