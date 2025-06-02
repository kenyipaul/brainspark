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
                <h1>Data Structures & Algorithm</h1>
                <p>Master modern web development by building dynamic and interactive user interfaces with React.js.</p>
                <div className="bottom-bar">
                    <h3>$15.55</h3>
                    <button>Enroll Now</button>
                </div>
            </div>
        </div>
    )
}