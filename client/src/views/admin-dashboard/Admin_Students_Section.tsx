import { Link } from 'react-router-dom'
import "/src/sass/admin-course.scss"
import { useState, useEffect } from 'react'
import Axios from 'axios'

interface UsersType {
  id: number,
  profile: string,
  firstName: string,
  lastName: string,
  email: string,
}

const AdminStudentsSection = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [users, setUsers] = useState<UsersType[] | []>([]);
  
  const toggleAddCourse = () => {
    setShowAddCourse(!showAddCourse);
  };

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:5112/users",
    }).then((response) => {
      setUsers(response.data);
    });
  }, []);


  return (
    <div className='admin-students-section'>
      <section className='adminUnion'>
        <h1>Students</h1>
        {/* <button onClick={toggleAddCourse}>Add Student</button>
        {showAddCourse && <RegisterStudent Close={toggleAddCourse}/>} */}
      </section>
      <div className="table_section">
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              {/* <th>PROFILE</th> */}
              <th>FIRST_NAME</th>
              <th>LAST_NAME</th>
              <th>EMAIL</th>
              {/* <th>ACTION</th> */}
            </tr>
          </thead>
            <tbody>
              {
                users.map((data,index) =>(
                  <UserTable key={index} id={data.id} profile={data.profile} firstName={data.firstName} lastName={data.lastName} email={data.email} action={toggleAddCourse} />
                ))
              }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminStudentsSection

type Props = {
  id:number,
  profile:string,
  firstName:string,
  lastName:string,
  email:string,
  action: () => void
}


const UserTable = ({id,profile,firstName,lastName,email}:Props) => {
  return(
      <tr>
        <td>{id}</td>
        {/* <td><img src={profile} alt="" />ggg</td> */}
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        {/* <td><button onClick={action}>Delete</button></td> */}
      </tr>
  )
}

type RegisterStudentProps = {
  Close: () => void;
};

const RegisterStudent = ({ Close }: RegisterStudentProps) => {
  return (
    <div className='flaoting-section' onClick={() => { Close() }}>
          <div id="form-section" onClick={(e) => e.stopPropagation()}>
            {/* <img src="/images/close-bold-svgrepo-com.svg" alt="" onClick={Close} style={{width:"3rem",height:"3rem"}}/> */}
            <div className="form">
                <h1>Create Account</h1>
                <div className="input-area-group">
                    <div className="input-area">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input-area">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="" id="" />
                    </div>
                </div>
                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="" />
                </div>
                <div className="input-area">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="" id="" />
                </div>
                <p>I already have an account? <Link to="/login">login here</Link></p>
                <button>Sign Up</button>
            </div>
        </div>
    </div>
  )
}