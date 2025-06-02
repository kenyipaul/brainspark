import Footer from "../components/Footer";

export default function Home() {
    return (
        <div id="home">
            <main id="main">
                <div className="banner">
                    <article>
                        <h1>What do you want to learn today?</h1>
                        <h3>Continue your learning journey with thousands of courses from world-class instructors</h3>
                        <div className="input-area">
                            <input type="text" placeholder="Search for courses" id="" />
                            <button>Search</button>
                        </div>
                        {/* <h4>Suggestion: <span>Data Structures</span> <span>Discrete Mathematics</span></h4> */}
                    </article>
                    {/* <img src="/images/Frames.svg" alt="" /> */}
                </div>

                <div className="content-container">
                    <div className="content-header">
                        <h1>Featured Courses</h1>
                    </div>
                    <div className="content">
                        {
                            courses.map((course, index) => {
                                return <Course data={course} key={index} />
                            })
                        }
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}


function Course({data}: {data: { title: string, description: string, cover: string, price: number, link: string }}) {
    return (
        <div className="course">
            <div className="cover"></div>
            <div className="info">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <div className="cta">
                    <h3>${data.price}</h3>
                    <button>Enroll Now</button>
                </div>
            </div>
        </div>
    );
}


export const courses = [
  {
    "title": "Introduction to Data Science",
    "description": "Learn the fundamentals of data science, including data manipulation, analysis, and visualization using Python and R.",
    "cover": "https://example.com/covers/data_science.jpg",
    "price": 49.99,
    "link": "https://example.com/courses/data_science"
  },
  {
    "title": "Web Development with React",
    "description": "Master modern web development by building dynamic and interactive user interfaces with React.js.",
    "cover": "https://example.com/covers/react_dev.jpg",
    "price": 59.99,
    "link": "https://example.com/courses/react_dev"
  },
  {
    "title": "Digital Marketing Fundamentals",
    "description": "Understand the core concepts of digital marketing, including SEO, social media marketing, and email campaigns.",
    "cover": "https://example.com/covers/digital_marketing.jpg",
    "price": 39.99,
    "link": "https://example.com/courses/digital_marketing"
  },
  {
    "title": "Graphic Design for Beginners",
    "description": "Explore the principles of graphic design and learn to create stunning visuals using Adobe Photoshop and Illustrator.",
    "cover": "https://example.com/covers/graphic_design.jpg",
    "price": 44.99,
    "link": "https://example.com/courses/graphic_design"
  },
  {
    "title": "Financial Planning and Investment",
    "description": "Gain essential knowledge in personal finance, investment strategies, and wealth management.",
    "cover": "https://example.com/covers/financial_planning.jpg",
    "price": 69.99,
    "link": "https://example.com/courses/financial_planning"
  },
  {
    "title": "Mobile App Development with Flutter",
    "description": "Build cross-platform mobile applications for iOS and Android using Google's Flutter framework.",
    "cover": "https://example.com/covers/flutter_dev.jpg",
    "price": 54.99,
    "link": "https://example.com/courses/flutter_dev"
  }
]