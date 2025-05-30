import "../../sass/user-dashboard.scss";
import { cardData } from "./userData";
import { useNavigate } from "react-router-dom";
export default function MyCourses() {
  const navigate = useNavigate();

  return (
    <div className="myCourses-page">
      <h1>My Courses</h1>
      <div className="myCourses-content">
        {cardData.map((course, index) => (
          <div className="course-card" key={index}>
            <img src={course.courseImage} alt="Course" />
            <h2>{course.courseTitle}</h2>
            <p>{course.courseSubTitle}</p>
            <button onClick={() => navigate("/Course/videos")}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}
