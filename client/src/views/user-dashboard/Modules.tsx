// import { useState } from 'react';
// import { courseModules } from './CourseModule';
import '../../sass/Modules.scss';
import { useNavigate } from "react-router-dom";

function ModuleContent() {
  // const [openModule, setOpenModule] = useState<number | null>(null);

  // const toggleModule = (index: number) => {
  //   setOpenModule(openModule === index ? null : index);
  // };
  const navigate = useNavigate();
  return (
        <div className="container-course">
          <div className="heading">
            <div className='arrow-left' >
              <img src="\images\chevron-left-svgrepo-com.svg" alt="" className="image" onClick={() => navigate("/user/mycourses")}/>
            </div>
            <div className="heading-text">
              <h2 className="head2">Course Content</h2>
              <h4 className="head4">current course</h4>
            </div>
          </div>

          <iframe
            src="https://www.youtube.com/embed/H3XIJYEPdus?si=Yw50YmhnNB1nO06X"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="video"
          ></iframe>
          {/* <div className='container'>
            <h5>Roadmap</h5>
            {courseModules.map((module: { id: number; title: string; content: string }, index:number) => (
              <div key={module.id} className='context-item'>
                <div
                  className='context-header'
                  onClick={() => toggleModule(index)}
                  >
                    
                  <h3>{module.title}</h3>
                  <span className="icon-wrapper" >
                    {openModule === index ?  <img src="/images/chevron-up-svgrepo-com.svg" alt="" className='icon' />: <img src='/images/chevron-down-svgrepo-com.svg' alt='' className="icon"/>}
                  </span>

                </div>
                {openModule === index && (
                  <p className="context-content">{module.content}</p>
                )}
                </div>
            ))}
          </div> */}
        </div>
  );
}

export default ModuleContent;