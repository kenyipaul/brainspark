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
        {showAddCourse && <CourseAddition Close={toggleAddCourse} />}
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
          <button >Delete</button>
        </article>
      </div>
    </div>
  );
};


export const CourseAddition = ({ Close }: { Close: () => void }) =>{
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadImage(files[0]);
    }
  };

  const reader = new FileReader();
  if (uploadImage) {
    reader.readAsDataURL(uploadImage);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as typeof event.target & {
      courseTitle: { value: string };
      courseSubTitle: { value: string };
    };
    courseData.unshift({
      courseImage: reader.result as string,
      courseTitle: form.courseTitle.value,
      courseSubTitle: form.courseSubTitle.value,
    });
    setUploadImage(null);
    (event.target as HTMLFormElement).reset();
  }

  return (
    <div className="flaoting-section" onClick={() => { Close() }}>
        <div id="form-section-2" onClick={(e) => e.stopPropagation()}>
          <div className="form">
            <h1>Upload Course</h1>
            <form className="all-content-holder" onSubmit={handleSubmit}>
              <div
                className="image-holder"
                style={{
                  background: uploadImage
                  ? `url(${URL.createObjectURL(uploadImage)})`
                  : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                >
                <label htmlFor="imageUpload">
                  <h3>Upload Image</h3>
                  <p>{uploadImage ? uploadImage.name : "Upload Course Image"}</p>
                </label>
                <input type="file" onChange={handleImageUpload} id="imageUpload"/>
              </div>
              <div className="inputgroup">
                  <div className="input-section">
                      <label htmlFor="Course Title">Course Title</label>
                      <input type="text" name="courseTitle" id="courseTitle" placeholder="Course Title"/>
                  </div>
                  <div className="input-section">
                      <label htmlFor="Course Sub-Title">Course Sub-Title</label>
                      <input type="text" name="`courseSubTitle`" id="courseSubTitle" placeholder="Course Sub-Title"/>
                  </div>
              </div>
              <button type="submit">Upload Course</button>
            </form>
          </div>
        </div>
    </div>
  )
}