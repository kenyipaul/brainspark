import CourseAddition from "../../components/CourseAddition";
import "../../sass/admin-course.scss";
import { useState, useEffect } from "react";
import Axios from "axios";

interface CourseType {
  id: string | number;
  name: string,
  price: number,
  imageUrl: string,
  description: string,
}

const AdminCoursesSection = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);

  const [courses, setCourses] = useState<CourseType[] | []>([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:5112/courses",
    }).then((response) => {
      setCourses(response.data);
    });
  }, []);

  const toggleAddCourse = () => {
    setShowAddCourse(!showAddCourse);
  };

  return (
    <div className="admin-courses-section">
      <section className="adminUnion">
        <h1>Courses</h1>
        <button onClick={toggleAddCourse}>Add New Course</button>
        {showAddCourse && <CourseAddition Close={toggleAddCourse} />}
      </section>
      <main className="card-container">
        {courses.map((data, index) => (
          <Card
            key={index}
            courseImage={data.imageUrl}
            courseTitle={data.name}
            coursePrice={data.price}
            courseSubTitle={data.description}
            courseId={data.id} // Assuming each course has a unique 'id' field
          />
        ))}
      </main>
    </div>
  );
};

export default AdminCoursesSection;


type CardProps = {
  courseImage: string;
  courseTitle: string;
  courseSubTitle: string;
  coursePrice: number;
  courseId: string | number;
};

const Card = ({
  courseImage,
  courseTitle,
  coursePrice,
  courseSubTitle,
  courseId,
}: CardProps) => {

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete the course: ${courseTitle}?`)) {
      return; // Exit if the user cancels the deletion
    }

    Axios({
      method: "DELETE",
      url: `http://localhost:5112/courses/${courseId}`,
    }).then((response) => {
      console.log("Course deleted:", response.data);
      window.location.reload(); 
    }).catch((error) => {
      console.error("Error deleting course:", error);
    });
  };
  return (
    <div className="card">
      <div
        className="image"
        style={{ backgroundImage: `url(${courseImage})` }}
      ></div>
      <div className="card-content">
        <h3>{courseTitle}</h3>
        <p>{coursePrice}$</p>
        <p>{courseSubTitle}</p>
          <button onClick={handleDelete}>Delete</button>
        {/* <article>
          <button onClick={handleEdit}>Edit</button>
        </article> */}
      </div>
    </div>
  );
};
