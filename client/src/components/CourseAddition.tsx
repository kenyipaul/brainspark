import "../sass/admin-course.scss";
import { useState } from "react";
import Axios from "axios";


const CourseAddition = ({ Close }: { Close: () => void }) => {
  const [uploadImage, setUploadImage] = useState<ArrayBuffer | string>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {

      const reader = new FileReader()

      reader.onload = () => {
        setUploadImage(reader.result)
      }

      reader.readAsDataURL(files[0])

    }
  };

  // useEffect(() => {
  //   const reader = new FileReader();

  //   if (uploadImage) {
  //     reader.readAsDataURL(uploadImage);
  //   }
  // });

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const form = event.target as typeof event.target & {
  //     courseTitle: { value: string };
  //     courseDescription: { value: string };
  //     coursePrice: { value: string };
  //   };
  //   courseData.unshift({
  //     courseImage: reader.result as string,
  //     courseTitle: form.courseTitle.value,
  //     coursePrice: form.coursePrice.value,
  //     courseDescription: form.courseDescription.value,
  //   });
  //   setUploadImage(null);
  //   (event.target as HTMLFormElement).reset();
  // };

  const submit = () => {
    const courseTitle = (document.getElementById("courseTitle") as HTMLInputElement).value;
    const link = (document.getElementById("courseSubTitle") as HTMLInputElement).value;
    const coursePrice = (document.getElementById("coursePrice") as HTMLInputElement).value;
    const courseDescription = (document.getElementById("courseDescription") as HTMLTextAreaElement).value;

    if (!uploadImage || !courseTitle || !coursePrice || !courseDescription) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    Axios({
      method: "POST",
      url: "http://localhost:5112/courses",
      data: {
        ImageUrl: uploadImage,
        Name: courseTitle,
        Price: coursePrice,
        Link: link,
        Description: courseDescription
      }
    }).then((response) => {
      if (response) {
        alert("Course uploaded successful")
        window.location.reload();
      }
    })
  }

  return (
    <div
      className="flaoting-section"
      onClick={() => {
        Close();
      }}
    >
      <div id="form-section-2" onClick={(e) => e.stopPropagation()}>
        <div className="form">
          <h1>Upload Course</h1>
          <p>Basic insertion of Courses for the program</p>
          <form className="all-content-holder" onSubmit={submit}>
            <div className="inputgroup">
              <div className="input-section">
                <h3>Title</h3>
                <input
                  type="text"
                  name="courseTitle"
                  id="courseTitle"
                  placeholder="Course Title"
                />
              </div>

              <div className="input-section">
                <h3>Price</h3>
                <input
                  type="text"
                  name="courseSubTitle"
                  id="coursePrice"
                  placeholder="Course Sub-Title"
                />
              </div>

            </div>
            <section>
              <h3>Course Image</h3>
              <div
                className="image-holder input-section"
                style={{
                  backgroundImage: uploadImage
                    ? `url(${uploadImage})`
                    // ? `url(${URL.createObjectURL(uploadImage)})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <label htmlFor="imageUpload">
                  <h3>Upload Image</h3>
                  {/* <p>
                    {uploadImage ? uploadImage.name : "Upload Course Image"}
                  </p> */}
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  id="imageUpload"
                />
              </div>
            </section>
            <div className="input-section">
              <h3>Link</h3>
              <input
                type="text"
                name="courseSubTitle"
                id="courseSubTitle"
                placeholder="Course Sub-Title"
              />
            </div>
            <div className="input-section">
              <h3>Description</h3>
              <textarea
                name=""
                placeholder="Brief Introduction about the course"
                id="courseDescription"
              ></textarea>
            </div>
            <button type="button" onClick={submit}>Upload Course</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseAddition;
