import "../../sass/admin-course.scss"
import {courseData} from "./cardsData"
import { useState } from "react";

const AdminCoursesSection = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);

  const toggleAddCourse = () => {
    setShowAddCourse(!showAddCourse);
  };

  return (
    <div className="admin-courses-section">
      <section className='adminUnion'>
        <h1>Courses</h1>
        <button onClick={toggleAddCourse}>Add New Course</button>
        {showAddCourse && <AddCourse Click={toggleAddCourse} FlotingSection={CourseAddition}/>}
      </section>
      <main className="card-container">
        {
          courseData.map((data,index) =>(
            <Card key={index} courseImage={data.courseImage} courseTitle={data.courseTitle  } courseSubTitle={data.courseSubTitle}/>
          ))
        }
      </main>
    </div>
  )
}

export default AdminCoursesSection

type CardProps = {
  courseImage: string;
  courseTitle: string;
  courseSubTitle: string;
};


const Card = ({ courseImage, courseTitle, courseSubTitle }: CardProps) => {
  return (
    <div className="card">
      <img src={courseImage} alt={courseSubTitle} />
      <div className="card-content">
        <h3>{courseTitle}</h3>
        <p>{courseSubTitle}</p>
        <article>
          <button>Edit</button>
          <button>Delete</button>
        </article>
      </div>
    </div>
  );
};

type AddCourseProps = {
  Click: () => void;
  FlotingSection: JSX.Element;
};

export const AddCourse = ({ Click,FlotingSection }: AddCourseProps) => {
  return (
    <div className="add-course">
      <img src="/images/close-bold-svgrepo-com.svg" alt="" onClick={() => { Click()}} style={{width:"3rem",height:"3rem"}}/>
      <FlotingSection/>
    </div>
  )
}


const CourseAddition = () =>{
  return (
    <div id="form-section-2">
      <div className="form">
        <h1>Upload Course</h1>
        <section className="all-content-holder">
          <div className="image-holder" >
            <button>Upload Image</button>
          </div>
          <div className="inputgroup">
              <div className="input-section">
                  <label htmlFor="Course Title">Course Title</label>
                  <input type="text" name="" id="" placeholder="Course Title"/>
              </div>
              <div className="input-section">
                  <label htmlFor="Course Sub-Title">Course Sub-Title</label>
                  <input type="text" name="" id="" placeholder="Course Sub-Title"/>
              </div>
          </div>
          <button>Upload Course</button>
        </section>
      </div>
    </div>
  )
}