import "../../sass/user-dashboard.scss";
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

export default function MyCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([])
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

      setUser(storedData);
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

  return (
    <div className="myCourses-page">
      <h1>My Courses</h1>
      <div className="myCourses-content">
        {courses && courses.map((course, index) => (
          <div className="course-card" key={index}>
            <img src={course.imageUrl} alt="Course" />
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <button onClick={() => navigate("/Course/videos")}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}
