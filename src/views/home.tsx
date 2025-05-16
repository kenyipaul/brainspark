import { Footer } from "../app";

export default function Home() {
    return (
        <div id="home">
            <main id="main">
                <div className="banner">
                    <article>
                        <h1>What do you want to learn today?</h1>
                        <p>Ready to gain a deep and thorough understanding in your field of interest? Our comprehensive courses provide the in-depth knowledge and practical skills necessary to excel.</p>
                        <div className="input-area">
                            <input type="text" placeholder="Search for courses" id="" />
                        </div>
                        <h3>Suggestion: <span>Data Structures</span> <span>Discrete Mathematics</span></h3>
                    </article>
                    <img src="/images/Frames.svg" alt="" />
                </div>

                <div className="content-container">
                    <div className="content-header">
                        <h1>Featured Courses</h1>
                    </div>
                    <div className="content">
                        <div className="course"></div>
                        <div className="course"></div>
                        <div className="course"></div>
                        <div className="course"></div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}