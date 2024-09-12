import {uid} from "./uid"
export const nodes = [
    {
      id: '0',
      name: 'Operating System',
      deadline: new Date(2020, 2, 15),
      type: 'SETUP',
      isComplete: true,
      nodes: 3,
    },
    {
      id: '1',
      name: 'VSCode',
      deadline: new Date(2020, 2, 17),
      type: 'SETUP',
      isComplete: true,
      nodes: 0,
    },
    {
      id: '2',
      name: 'Python',
      deadline: new Date(2020, 2, 24),
      type: 'SETUP',
      isComplete: true,
      nodes: 0,
    },
    {
      id: '3',
      name: 'JavaScript',
      deadline: new Date(2020, 3, 28),
      type: 'LEARN',
      isComplete: true,
      nodes: 3,
    },
    {
      id: '4',
      name: 'React',
      deadline: new Date(2020, 4, 8),
      type: 'LEARN',
      isComplete: false,
      nodes: 5,
    },
    {
      id: '5',
      name: 'Git',
      deadline: new Date(2020, 5, 28),
      type: 'DATE',
      isComplete: false,
      nodes: 0,
    },
    {
      id: '6',
      name: 'Node',
      deadline: new Date(2020, 6, 18),
      type: 'LEARN',
      isComplete: true,
      nodes: 1,
    },
    {
      id: '7',
      name: 'Node',
      deadline: new Date(2020, 6, 18),
      type: 'LEARN',
      isComplete: true,
      nodes: 1,
    },
  ];
  
  

