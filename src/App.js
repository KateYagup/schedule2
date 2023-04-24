import React from 'react';

import {v4} from 'uuid';
import Schedule from './Schedule';


  const initSchedule = [
    {
        course: 1,
        group : 'КН-221а',
        schedule:[
            { id: v4(), time: '08:30', day: 'mond',  subj: 'ООП', type: 'lec', teach: 'Ivanov', aud: 'Y1-333', subj1: 'Java', type1: 'lab', teach1: 'Стратиенко', aud1: 'y2-222'},
            // { id: v4(), time: '10:25', day: 'mond', subj: 'Модели и структуры', type: 'lec', teach: 'Ягуп', aud: 'Y1-333'},
            // { id: v4(), time: '12:35', day: 'mond', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'tuesd',  subj: 'ООП', type: 'lec', teach: 'Ivanov', aud: 'Y1-333', subj1: 'Java', type1: 'lec', teach1: 'Стратиенко', aud1: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'tuesd', subj: 'Модели и структуры', type: 'lec', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'tuesd', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'wedn',  subj: 'ООП', type: 'lec', teach: 'Ivanov', aud: 'Y1-333', subj1: 'Java', type1: 'lec', teach1: 'Стратиенко', aud1: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'wedn', subj: 'Модели и структуры', type: 'lec', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'wedn', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},

            {id: v4(), time: '08:30', day: 'thurs', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'thurs',  subj: 'ООП', type: 'lab', teach: 'Ivanov', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'thurs',  subj: 'Модели и структуры', type: 'lab', teach: 'Ягуп', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'fri', subj: 'Модели и структуры', type: 'pr', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'fri', subj: 'Ймовірність', type: 'pr', teach: 'Єршова', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'fri', subj: 'ООП', type: 'pr', teach: 'Ivanov', aud: 'Y1-333'},
        ]
    },
    {
        course: 1,
        group : 'КН-221б',
        schedule:[   
            {id: v4(), time: '08:30', day: 'mond', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},
            // { id: v4(), time: '10:25', day: 'mond',  subj: 'ООП', type: 'lab', teach: 'Ivanov', aud: 'Y1-333'},
            // { id: v4(), time: '12:35', day: 'mond',  subj: 'Модели и структуры', type: 'lab', teach: 'Ягуп', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'tuesd',  subj: 'ООП', teach: 'Ivanov', type: 'pr', aud: 'Y1-333', subj1: 'Java', type1: 'lab', teach1: 'Стратиенко', aud1: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'tuesd', subj: 'Модели и структуры', type: 'pr', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'tuesd', subj: 'Ймовірність', type: 'pr', teach: 'Єршова', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'wedn',  subj: 'ООП', type: 'lec', teach: 'Ivanov', aud: 'Y1-333', subj1: 'Java', type1: 'lec', teach1: 'Стратиенко', aud1: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'wedn', subj: 'Модели и структуры', type: 'lec', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'wedn', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},

            {id: v4(), time: '08:30', day: 'thurs', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'thurs',  subj: 'ООП', type: 'lab', teach: 'Ivanov', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'thurs',  subj: 'Модели и структуры', type: 'lab', teach: 'Ягуп', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'fri', subj: 'Модели и структуры', type: 'pr', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'fri', subj: 'Ймовірність', type: 'pr', teach: 'Єршова', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'fri', subj: 'ООП', type: 'pr', teach: 'Ivanov', aud: 'Y1-333'},
        ]
    },
    {
        course: 2,
        group : 'КН-221s',
        schedule:[   
            { id: v4(), time: '08:30', day: 'mond', subj: 'Модели и структуры', type: 'pr', teach: 'Ягуп', aud: 'Y1-333'},
            // { id: v4(), time: '10:25', day: 'mond', subj: 'Ймовірність', type: 'pr', teach: 'Єршова', aud: 'Y1-333'},
            // { id: v4(), time: '12:35', day: 'mond', subj: 'ООП', type: 'pr', teach: 'Ivanov', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'tuesd',  subj: 'ООП',type: 'pr', teach: 'Ivanov', aud: 'Y1-333', subj1: 'Java', type1: 'lec', teach1: 'Стратиенко'},
            { id: v4(), time: '10:25', day: 'tuesd', subj: 'Модели и структуры', type: 'pr', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'tuesd', subj: 'Ймовірність', type: 'pr', teach: 'Єршова', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'wedn',  subj: 'ООП', type: 'lec', teach: 'Ivanov', aud: 'Y1-333', subj1: 'Java', type1: 'lec', teach1: 'Стратиенко', aud1: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'wedn', subj: 'Модели и структуры', type: 'lec', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'wedn', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},

            {id: v4(), time: '08:30', day: 'thurs', subj: 'Ймовірність', type: 'lec', teach: 'Єршова', aud: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'thurs',  subj: 'ООП', type: 'lab', teach: 'Ivanov', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'thurs',  subj: 'Модели и структуры', type: 'lab', teach: 'Ягуп', aud: 'Y1-333'},

            { id: v4(), time: '08:30', day: 'fri', subj: 'Модели и структуры', type: 'pr', teach: 'Ягуп', aud: 'Y1-333'},
            { id: v4(), time: '10:25', day: 'fri', subj: 'Ймовірність', type: 'pr', teach: 'Єршова', aud: 'Y1-333'},
            { id: v4(), time: '12:35', day: 'fri', subj: 'ООП', type: 'pr', teach: 'Ivanov', aud: 'Y1-333'},
        ]
    }
  ];

  // Создаем новое поле blink, которое опеределяет как редактировать мигалку и 
  //  поле showControls для появления команд добавления/удаления строки/стоблца showControls
for (let row of initSchedule) {
    for(let rowSch of row.schedule) {
        rowSch.showControls = false;
        if('teach1' in rowSch){
        rowSch.blink = true;
    } else {
        rowSch.blink = false;
    }
      rowSch.editAll = false;
    }
}

// Функция траспонирования матрицы. Для преобразования таблицы так, чтобы в стобце было расписание одной группы

function transArr(initSchedule) {
  const newStructure =[];
    for (let j = 0; j < initSchedule[0].schedule.length; j++) {
      let newRow =[];
        for (let i = 0; i < initSchedule.length; i++) {
            initSchedule[i].schedule[j].group = initSchedule[i].group;
            initSchedule[i].schedule[j].course = initSchedule[i].course;
            newRow.push(initSchedule[i].schedule[j]);
        }
      newStructure.push(newRow);
    }
   return newStructure;
  }

  const newStructure = transArr(initSchedule);

//  Формиование списка групп для заголовка
  let headGroups = [];

    for (let i = 0; i < newStructure[0].length; i++) {
        headGroups.push({id: v4(), group: newStructure[0][i].group, course: newStructure[0][i].course, isEdit: false});
    }

    let arrTime = ['08:30', '10:25', '12:35', '14:20', '16:25', '18:10'];
    const initSubj = ['Модели и структуры', 'ООП', 'Ймовірність'];
    
    

function App() {
 return <div>
   
    <Schedule 
        newStructure={newStructure}
        headGroups={headGroups}
        arrTime={arrTime}
        initSubj={initSubj}
     />
 </div>
}

export default App;