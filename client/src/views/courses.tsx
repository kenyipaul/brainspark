import Axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Courses() {

    const navigate = useNavigate();
    type Course = {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        price: number;
    };

    const [courses, setCourses] = useState<Course[]>([])
    const [backupCourses, setBackupCourses] = useState<Course[]>([])

    useEffect(() => {
        Axios({
            method: "GET",
            url: "http://localhost:5112/courses",
        }).then((response) => {
            setCourses(response.data)
            setBackupCourses(response.data)
        })
    }, [])

    const search = (event) => {
        const searchInput = event.target.value.toLowerCase();

        if (searchInput !== "") {

            const searchResults = courses.filter((course) => {
                return course.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchInput.toLowerCase());
            });
            
            setCourses(searchResults)
        } else {
            setCourses(backupCourses)
        }
    }

    return (
        <div id="course-page">
            <div className="course-page-header">
                <h1>Our Comprehensive Courses</h1>
                <h3>From foundational knowledge to advanced expertise: discover our comprehensive courses.</h3>
                <div className="input-area">
                    <input onInput={search} type="text" name="" id="" placeholder="Search courses here..." />
                </div>
            </div>

            <div className="course-page-content">
                <div className="course">
                    <div className="cover" style={{ }}></div>
                    <div className="info">
                        <h1>DATA STRUCTURES AND ALGORITHMS</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum facere, magnam laudantium fugiat blanditiis sequi aspernatur ipsam quasi laboriosam.</p>
                        <div className="bottom-bar">
                            <h3>$35</h3>
                            <button onClick={() => navigate(`/payment/3`)}>Enroll Now</button>
                        </div>
                    </div>
                </div>

                {
                    courses.map((course, key) => {
                        return (
                            <div className="course" key={key}>
                                <div className="cover" style={{
                                    backgroundImage: `url(${course.imageUrl})`
                                }}></div>
                                <div className="info">
                                    <h1>{course.name}</h1>
                                    <p>{course.description}</p>
                                    <div className="bottom-bar">
                                        <h3>${course.price}</h3>
                                        <button onClick={() => navigate(`/payment/${course.id}`)}>Enroll Now</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}