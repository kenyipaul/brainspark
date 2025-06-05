import "../../sass/user-dashboard.scss";
import "../../sass/admin-course.scss";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Axios from "axios";

interface UserType {
  authorized: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface CourseType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  subscribers?: string[];
}

export default function MyCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<CourseType[]>([])
  const [user, setUser] = useState<UserType>({
      authorized: false,
      data: { id: "", firstName: "", lastName: "", email: "" },
    });

    useEffect(() => {
      let storedData: unknown = sessionStorage.getItem("_user_data");

      if (storedData == null) {
        storedData = {} as object;
      } else {
        storedData = JSON.parse(storedData as string);
      }

      setUser(storedData as UserType);
    }, []);

  useEffect(() => {

    if (user?.data.id) {
    Axios(
      {
        method: "GET",
        url: `http://localhost:5112/courses`,
      }
    )
      .then((response) => {
        
        const subscribers = []
        const responseData = response.data;

        for (let i = 0; i < responseData.length; i++) {
          if (responseData[i].subscribers && responseData[i].subscribers.includes(user?.data.id)) {
            subscribers.push(responseData[i])
          }
        }

        setCourses(subscribers)
      })
      .catch((error) => {
        console.error("Error during API call:", error);
      }
    )
  }
  }, [user])

  const open = (id: string, link: string) => {
    navigate(`/course/video/${id}`)
    sessionStorage.setItem("current_video", link)
  }

  return (
    <div className="myCourses-page">
      <h1>My Courses</h1>
      <div className="myCourses-content">
        {courses && courses.map((course, index) => (
          courses.length === 0 ?
            <h2 key={index}>You have not subscribed to any courses yet.</h2>
          :
          <Card key={index} courseImage={course.imageUrl} courseTitle={course.name} open={open}  courseDescription={course.description} courseID={course.id} courseLink={course.link}/>
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  courseImage: string;
  courseTitle: string;
  courseDescription: string;
  courseID: string;
  courseLink: string;
  open: (id: string, link: string) => void;
}

const Card = ({
  courseImage,
  courseTitle,
  courseDescription,
  courseID,
  courseLink,
  open
}: CardProps) => {
  return (
    <div className="card">
      <div
        className="image"
        style={{ backgroundImage: `url(${courseImage})` }}
      ></div>
      <div className="card-content">
        <h3>{courseTitle}</h3>
        <p>{courseDescription}$</p>
        <button
          onClick={() => open(courseID, courseLink)}
          style={{
            width: "100%",
            padding: "1rem",
            background: "#fa8072",
            borderRadius: ".5rem",
            border: "none",
            fontSize: "1.2em",
            cursor: "pointer"
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
};
