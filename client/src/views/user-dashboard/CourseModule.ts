// types.ts
export interface CourseModule {
    id: number;
    title: string;
    content: string;
  }

export const courseModules = [
  {
    id: 0,
    title: "Intro",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quam aperiam veritatis ratione voluptatem eos similique. Eum laudantium quis facere quae, tenetur labore. Id doloribus velit debitis accusantium magnam dolor."
  },
  {
    id: 1,
    title: "Module 1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quam aperiam veritatis ratione voluptatem eos similique. Eum laudantium quis facere quae, tenetur labore. Id doloribus velit debitis accusantium magnam dolor.1500 Lorem ipsum dolor sit amet consectetur adipisicing elit."
  
  },
  {
    id: 2,
    title: "Module 2",
    content: "Module 2 delves deeper into practical applications and advanced topics, building on the previous module."
  },
  {
    id: 3,
    title: "Module 3",
    content: "Module 3 focuses on real-world examples and project work, allowing you to apply what you've learned."
  },
];