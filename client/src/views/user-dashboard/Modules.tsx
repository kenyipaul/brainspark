import { useState } from 'react';
import { courseModules } from './CourseModule';
import '../../sass/Modules.scss';

function ModuleContent() {
  const [openModule, setOpenModule] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
        <div className="container-course">
          <h1 className='title'>Welcome To your Course</h1>
          <iframe
            src="https://www.youtube.com/embed/H3XIJYEPdus?si=Yw50YmhnNB1nO06X"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className='video'
          ></iframe>
          <h2>Course Content</h2>
          <h4>current course</h4>
          <div className='container'>
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
            </div>
        </div>
  );
}

export default ModuleContent;