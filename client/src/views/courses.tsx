export default function Courses() {
    return (
        <div id="course-page">
            <div className="course-page-header">
                <h1>Our Comprehensive Courses</h1>
                <h3>From foundational knowledge to advanced expertise: discover our comprehensive courses.</h3>
                <div className="input-area">
                    <input type="text" name="" id="" placeholder="Search courses here..." />
                </div>
            </div>

            <div className="course-page-content">
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
            </div>
        </div>
    )
}

function Course() {
    return (
        <div className="course">
            <div className="cover"></div>
            <div className="info">
                <h3>Data Structures & Algorithm</h3>
                <p>Fundamentals using C++</p>
                <h1>$15.55</h1>

                <button>Register Now</button>
            </div>
        </div>
    )
}