import React, {useState}  from 'react';
import RowOfSched from './RowOfSched';
import HeadOfGroup from './HeadOfGroup';
import RowOfSchedSort from './RowOfSchedSort';
import RowOfSchedEdit from './RowOfSchedEdit';
import {v4} from 'uuid';


function Schedule({newStructure, headGroups, arrTime, initSubj}) { 

    //ставим приставку st перед стейтами
    const [stBaseSchedule, setBaseShedule]= useState(newStructure); // основная таблица
    const [stShowSchedule, setShowSchedule] = useState(newStructure); //таблица внешняя, для того, чтобы менять местами что-то в таблице
    const [stHeadGroups, setHeadGroups] = useState(headGroups);

    // Стейты для выбора препода
    const initTeachers = ['Все','Ягуп', 'Єршова', 'Ivanov', 'Стратиенко'];
    const [teachArr, setTeachArr] = useState(initTeachers);
    const [valueSelect, setValueSelect] =  useState('');

    // Стейт для установки режима. 0-просмотр; 1 - сортировка в режиме просмотра;
    //  2  - режим редактирование покурсно; 3 - режим редактирования в режиме сортировки (можно потом доделать)
    const [stMode, setMode] = useState(0);

    // Стейт для выбора курса
    const [stValueCourse, setValueCourse] = useState(1);
    
    // Стейт для выбора радиокнопока
    const [stRadio, setRadio] = useState(1);

    // Список предметов для выпадающего списка
    const [stSubjArr, setSubjArr] = useState(initSubj);

    // Стейт ширины названия дня в таблице
    const [stWidthDay, setWidthDay] = useState("10");

 // Формирование выпадающего списка из фамилий преподов
 const surnames = initTeachers.map(surn => {
    return <option > {surn}</option>
});

// Формирование выпадающего списка для предметов
let optionsSubj = stSubjArr.map(subj => {
        return <option> {subj} </option>
});

function changeField(id, field, event) {
    setBaseShedule(stBaseSchedule.map(row => {
        row.map(cell => {
            if(cell.id ===id) {
                cell[field] = event.target.value;
            }
        })
        return row;
    }));
    setShowSchedule(stBaseSchedule);
}

// Функция изменения значений радиокнопок для курсов
function changeRadio(event) {
    setRadio(event.target.value);
}

// Формирование шапки таблицы, сосотоящее из названия групп или фамилии выбранного препода
    var headOfTable;
    if (stMode === 0 ) {
        let headCourse =[];
        for(let i = 0; i < stHeadGroups.length; i++) {
        if(stHeadGroups[i].course === stValueCourse)
        {
            headCourse.push(stHeadGroups[i]);
        }
      }
      headOfTable= headCourse.map( group => {
        return <th className='cellHeadParameters' >
            {group.group}
            </th>
      });
    }
    if (stMode === 2) {
      let headCourse =[];
      for(let i = 0; i < stHeadGroups.length; i++) {
        if(stHeadGroups[i].course === stValueCourse)
        {
            headCourse.push(stHeadGroups[i]);
        }
      }
      headOfTable= headCourse.map( group => {
        return <HeadOfGroup 
            id={group.id}
            group={group.group}
            isEdit={group.isEdit}
            toggleModeHead={toggleModeHead}
            editHeadGroup={editHeadGroup}
            changeGroupsColumn={changeGroupsColumn}
        />
      });
  }
    if (stMode === 1) headOfTable = <div class='head'>
    {valueSelect} 
    </div>

    function toggleModeHead(id) {
        setHeadGroups(stHeadGroups.map(group => {
            if (group.id === id) {
                group.isEdit= !group.isEdit;
            }
            return group;
          }
        ));
    }

    function editHeadGroup(id, event) {
        setHeadGroups(stHeadGroups.map(group => {
            if(group.id === id) {
                group.group = event.target.value;
            }
            return group;
          }
        ));
    }

    function changeGroupsColumn(id, event) {
          let j = 0; 
        // Цикл определения номера столбца
        for (; j < stHeadGroups.length; j++) {
            if (id === stHeadGroups[j].id) {
                console.log(j);
                break;
            }
        }
        for (let i = 0; i < stBaseSchedule.length; i++)  {
            stBaseSchedule[i][j].group =event.target.value;
        }
        setBaseShedule(stBaseSchedule);
        setShowSchedule(stBaseSchedule);
    }

//   Формирование вида таблицы на странице

    let structMond = [],
        structTuesd = [], 
        structWedn = [], 
        structThurs= [],
        structFri = [];

    //  Формирование структуры для одельных курсов
    let stValueCourse1 = stValueCourse;
    let rowsMond, rowsTuesd, rowsWedn, rowsThurs, rowsFri;

    // Режим просмотра
    if (stMode === 0) {
        culcNumbersOfColomn(stValueCourse1);
        fillDayCourse('mond',  structMond, stValueCourse1);        
        fillDayCourse('tuesd', structTuesd, stValueCourse1);    
        fillDayCourse('wedn',  structWedn, stValueCourse1);
        fillDayCourse('thurs', structThurs, stValueCourse1);
        fillDayCourse('fri',   structFri, stValueCourse1);

        rowsMond= mapDay(structMond);
        rowsTuesd= mapDay(structTuesd);
        rowsWedn= mapDay(structWedn);
        rowsThurs= mapDay(structThurs);
        rowsFri = mapDay(structFri);
    }
    // Режим сортировки по преподавателям
    if (stMode === 1) {
            // Формирование структуры без разделения на курсы для сортировки для препода 
        fillDay('mond', structMond);        
        fillDay('tuesd', structTuesd);    
        fillDay('wedn', structWedn);
        fillDay('thurs', structThurs);
        fillDay('fri', structFri);

        rowsMond= mapDaySort(structMond);
        rowsTuesd= mapDaySort(structTuesd);
        rowsWedn= mapDaySort(structWedn);
        rowsThurs= mapDaySort(structThurs);
        rowsFri = mapDaySort(structFri);
    }

    // Режим редактирования
    if (stMode === 2) {
        culcNumbersOfColomn(stValueCourse1);

        fillDayCourse('mond',  structMond, stValueCourse1);        
        fillDayCourse('tuesd', structTuesd, stValueCourse1);    
        fillDayCourse('wedn',  structWedn, stValueCourse1);
        fillDayCourse('thurs', structThurs, stValueCourse1);
        fillDayCourse('fri',   structFri, stValueCourse1);

        rowsMond= mapDayEdit(structMond);
        rowsTuesd= mapDayEdit(structTuesd);
        rowsWedn= mapDayEdit(structWedn);
        rowsThurs= mapDayEdit(structThurs);
        rowsFri = mapDayEdit(structFri);
    }
     // Заполнение расписания для одного дня
    function fillDay(name, structDay) {
        // setShowSchedule(stBaseSchedule);
        for (let row of stShowSchedule) {
            if (row[0].day === name) {
                structDay.push(row);
            }
        }
    }

    // Заполнение расписания для одного дня для курса
    function fillDayCourse(name, structDay, numbOfCourse) {
        for (let row of stShowSchedule) {
            let arr =[];
            if (row[0].day === name ) {
                for(let cell of row) {
                    if (cell.course === numbOfCourse) {
                        arr.push(cell);
                    }
                }
                structDay.push(arr);
            }
        }
    }

    // Функция для подсчета количества колонок для объединения их для названия дня недели
    // Не нужна, можно выставить максимальное количество ячеек. 
    function culcNumbersOfColomn(numbOfCourse) {
        let culcNumbersOfColomn = 0;
        for(let j = 0; j < stShowSchedule[0].length; j++){
            if(stShowSchedule[0][j].course === numbOfCourse) {
               culcNumbersOfColomn++;
            }
            let s = '"' + culcNumbersOfColomn + '"';
            console.log('!!!!!');
            console.log(numbOfCourse);
            console.log(s);
            // setWidthDay(culcNumbersOfColomn);
        }
        
    }
    
    // Функция вывода таблицы
    function mapDay(structname) {
        return structname.map( row => {
            const cells = row.map( cell => {
                    return <RowOfSched
                            cell={cell}
                            id={cell.id}
                            f_showOperations={f_showOperations}
                            showControls={cell.showControls}
                            f_addColumn={f_addColumn}
                            f_deleteColumn={f_deleteColumn}
                            f_addRowEnd={f_addRowEnd}
                            f_deleteRowEnd={f_deleteRowEnd}
                            f_makeBlink={f_makeBlink}
                         />
            });
          return   <tr>{cells}</tr>
        });
    }

     // Функция вывода таблицы по курсам
     function mapDayCourse(structname, numbCourse) {
        return structname.map( row => {
            const cells = row.map( cell => {
                    return <RowOfSched
                            cell={cell}
                            id={cell.id}
                            f_showOperations={f_showOperations}
                            showControls={cell.showControls}
                            f_addColumn={f_addColumn}
                            f_deleteColumn={f_deleteColumn}
                            f_addRowEnd={f_addRowEnd}
                            f_deleteRowEnd={f_deleteRowEnd}
                            f_makeBlink={f_makeBlink}
                         />
            });
          return   <tr>{cells}</tr>
        });
    }

    //  Функция сортировки по фамилиям преподавателей
    function mapDaySort(structname) {
        return structname.map( row => {
            const cells = row.map( cell => {
                    return <RowOfSchedSort
                            cell={cell}
                            id={cell.id}
                            f_showOperations={f_showOperations}
                            showControls={cell.showControls}
                            f_addColumn={f_addColumn}
                            f_deleteColumn={f_deleteColumn}
                            f_addRowEnd={f_addRowEnd}
                            f_deleteRowEnd={f_deleteRowEnd}
                            f_makeBlink={f_makeBlink}
                         />
            });
          return   <tr>{cells}</tr>
        });
    }

    function mapDayEdit(structname) {
        return structname.map( row => {
            const cells = row.map( cell => {
                    return <RowOfSchedEdit
                            cell={cell}
                            id={cell.id}
                            optionsSubj={optionsSubj}
                            f_showOperations={f_showOperations}
                            showControls={cell.showControls}
                            f_addColumn={f_addColumn}
                            f_deleteColumn={f_deleteColumn}
                            f_addRowEnd={f_addRowEnd}
                            f_deleteRowEnd={f_deleteRowEnd}
                            f_makeBlink={f_makeBlink}
                            changeField={changeField}
                         />
            });
          return   <tr>{cells}</tr>
        });
    }

    // Формирование стобцов со временем пар
    let timeMond = f_timeDay(structMond);
    let timeTuesd = f_timeDay(structTuesd);
    let timeWedn = f_timeDay(structWedn);
    let timeThurs = f_timeDay(structThurs);
    let timeFri = f_timeDay(structFri);


    function f_timeDay(structDay) {
        let nameOfDay =[]
        for(let i = 0; i < structDay.length; i++)
        {
            nameOfDay.push(structDay[i][0].time);
        }
        return nameOfDay;
    }

    let mapTimeMond = f_mapTime(timeMond);
    let mapTimeTuesd = f_mapTime(timeTuesd);
    let mapTimeWedn = f_mapTime(timeWedn);
    let mapTimeThurs = f_mapTime(timeThurs);
    let mapTimeFri = f_mapTime(timeFri);

    function f_mapTime(timeDay)  {
        let times = timeDay.map(day => {
            return <div className='timeDay'>
                {day}
            </div>
        });
        return <div className='timeOneDay' >
            {times}
            </div>;
    }

    // РЕДАКТИРОВАНИЕ ТАБЛИЦЫ
    // Функция для редактирования таблицы
    function f_showOperations (id) {
        setShowSchedule(stShowSchedule.map( row => {
             row.map( cell=> {
                if(cell.id === id) {
                    cell.showControls =!(cell.showControls);
                }
            });
            return row;
        }));
    }

    function f_addColumn(id) {
        let  j = 0;
        let stopCycle = false;
        let course;
       
        //  Цикл определения номера столбца, после которого добавить столбец
        for (; j < stBaseSchedule[0].length; j++ ) {
            for (let i = 0; i < stBaseSchedule.length; i++ ) {
                    if (stBaseSchedule[i][j].id === id) {
                        course = stBaseSchedule[i][j].course;
                        stopCycle= true;
                        break;
                    }
                }
            if (stopCycle === true) 
            {
                break;
            }   
        }
        console.log('course ' + course);
    //  Блок добавления нового столбца в исходную  структуру
        for (let i = 0; i < stBaseSchedule.length; i++ ) {
        stBaseSchedule[i].splice(j + 1, 0, 
            {id: v4(),  subj: 'Предмет', teach: 'Викладач', type: 'pr', aud: 'Y1-',  
             group : 'new group', course: course, blink: false, editAll: false, showControls: false,
             time: stBaseSchedule[i][0].time, day: stBaseSchedule[i][0].day
            });
        }
        setBaseShedule(stBaseSchedule); // Изменяем базовую таблицу
        setShowSchedule(stBaseSchedule); // Видоизменяем таблицу на странице

        // Блок изменения шапки таблицы
        stHeadGroups.splice(j + 1, 0, {id: v4(), group: 'new group', course: course, isEdit: false});
        setHeadGroups(stHeadGroups);
    }

    function f_deleteColumn(id) {
        let  j = 0;
        let stopCycle = false;
       
        //  Цикл определения номера столбца, после которого добавить столбец
        for (; j < stBaseSchedule[0].length; j++ ) {
            for (let i = 0; i < stBaseSchedule.length; i++ ) {
                    if (stBaseSchedule[i][j].id === id) {
                        stopCycle= true;
                        break;
                    }
                }
            if (stopCycle === true) 
            {
                break;
            }   
        }
    //  Блок добавления удаления текущего столбца 
        for (let i = 0; i < stBaseSchedule.length; i++ ) {
            // console.log(stBaseSchedule[i][0].time);
            stBaseSchedule[i].splice(j , 1);
        }
        setBaseShedule(stBaseSchedule); // Изменяем базовую таблицу
        setShowSchedule(stBaseSchedule); // Видоизменяем таблицу на странице

        // Блок изменения шапки таблицы
        stHeadGroups.splice(j , 1);
        setHeadGroups(stHeadGroups);
    }

    // Функция добавления строки в любом месте
    // Не используется
    function f_addRow(id) {
        let  i = 0;
        let stopCycle = false;
       
        //  Цикл определения номера текущей строки
        for (; i < stBaseSchedule.length; i++ ) {
            for (let j =0; j < stBaseSchedule[i].length; j++ )  {
                    if (stBaseSchedule[i][j].id === id) {
                        // console.log('Строка ' + i + '  ' + j);
                        stopCycle= true;
                        break;
                    }
                }
            if (stopCycle === true) 
            {
                break;
            }   
        }

        // Блок добавления новой строки внизу
        let row =[];
               
        for (let j =0; j < stBaseSchedule[i].length; j++ ) {
            row.push({id: v4(),  subj: 'Предмет', teach: 'Викладач', type: 'pr', aud: 'Y1-',  
            group : 'new group', course: 1, blink: false, editAll: false, showControls: false,
            time: '16:00', day: 'mond'
           //  time: dayTimeInsert[i].time, day:  dayTimeInsert[i].day
           });
        }
        console.log(row);
        stBaseSchedule.splice(3, 0, row);
        console.log(stBaseSchedule);

        setBaseShedule(stBaseSchedule); // Изменяем базовую таблицу
        setShowSchedule(stBaseSchedule); // Видоизменяем таблицу на странице
    }

    // Функция добавления строки в конец дня
    function f_addRowEnd(id) {
        let  i = 0;
        let stopCycle = false;
        let day;
       
        //  Цикл определения номера текущей строки и дня недели
        for (; i < stBaseSchedule.length; i++ ) {
            for (let j =0; j < stBaseSchedule[i].length; j++ )  {
                    if (stBaseSchedule[i][j].id === id) {
                        day = stBaseSchedule[i][j].day;
                        stopCycle= true;
                        break;
                    }
                }
            if (stopCycle === true) 
            {
                break;
            }   
        }
        
        // Определение позиции последней пары в дне недели
        let last_i = i; // Номер последней пары в списке
        let last_time;
        let  _flagAddRow = false; // Флаг, который не добавит пару, если уже есть последняя 
       
        for (; i < stBaseSchedule.length; i++) {
            if (stBaseSchedule[i][0].day === day) {
                last_time = stBaseSchedule[i][0].time;
                last_i = i;
            }     else {
                console.log(stBaseSchedule[i][0].time);
                break;
            }
        }
        console.log('!!!last_time' + last_time);
       
        //  Определяем время следующей пары с учетом последней пары
        for (let j = 0; j < arrTime.length - 1; j++) {
            console.log('arrTime[j]' + arrTime[j]);
            if (arrTime[j] === last_time) {
                last_time = arrTime[j + 1];
                _flagAddRow = true;
                break;
            }
        }

        console.log('last_time ' + last_time + _flagAddRow);
        console.log('i = ' + i);

        // Блок добавления новой строки внизу
        if (_flagAddRow === true) {
            let row =[];
                
            for (let j =0; j < stBaseSchedule[0].length; j++ ) {
                row.push({id: v4(),  subj: 'Предмет', teach: 'Викладач', type: 'pr', aud: 'Y1-',  
                group : stBaseSchedule[0][j].group, course: 1, blink: false, editAll: false, showControls: false,
                time: last_time, day: day
            });
            }
            console.log(row);
            stBaseSchedule.splice(last_i + 1, 0, row);
            console.log(stBaseSchedule);
            setBaseShedule(stBaseSchedule); // Изменяем базовую таблицу
            setShowSchedule(stBaseSchedule); // Видоизменяем таблицу на странице
        }
    }

    // Фукнция удаления последней пары в конце дня
    function f_deleteRowEnd(id) {
        console.log('f_deleteRowEnd');
        let  i = 0, day;
        let stopCycle = false;
        let  _flagDeleteRow = false;
        let last_i = i; // Номер последней пары в списке
        let last_time;
       
        //  Цикл определения номера текущей строки
        for (; i < stBaseSchedule.length; i++ ) {
            for (let j =0; j < stBaseSchedule[i].length; j++ )  {
                    if (stBaseSchedule[i][j].id === id) {
                        day = stBaseSchedule[i][j].day;
                        stopCycle= true;
                        break;
                    }
                }
            if (stopCycle === true) 
            {
                break;
            }   
        }
        console.log(stBaseSchedule.length + ' !!!!! ' + stBaseSchedule[i][0].time);


        //  Определяем позицию строки, которую нужно удалить по времени последней пары в дне недели
        while (stBaseSchedule[i][0].day === day) {
            last_time = stBaseSchedule[i][0].time;
            last_i = i;
            i++;
            if (i ===  stBaseSchedule.length) {
                // console.log('Выход из цикла');
                // console.log(i + '===' + stBaseSchedule.length);
              break;
            }
            
        }
       if (last_i > 0) {
            console.log('!!!!! ' + stBaseSchedule[last_i][0].time);

            //  Определяем время следующей пары с учетом последней пары
            for (let j = 0; j < arrTime.length ; j++) {
                if (arrTime[j] === last_time) {
                    last_time = arrTime[j];
                    console.log(last_time);
                    _flagDeleteRow = true;
                    break;
                }
            }

            // Блок удаления последней строки
            if (_flagDeleteRow === true ) {
                    stBaseSchedule.splice(last_i, 1);
                    setBaseShedule(stBaseSchedule); // Изменяем базовую таблицу
                    setShowSchedule(stBaseSchedule); // Видоизменяем таблицу на странице
            }
      }
    }

     // Фукнция удаление строки в любом месте, доработать пересчет времени пар
     function f_deleteRow(id) {

        let  i = 0;
        let stopCycle = false;
       
        //  Цикл определения номера текущей строки
        for (; i < stBaseSchedule.length; i++ ) {
            for (let j =0; j < stBaseSchedule[i].length; j++ )  {
                    if (stBaseSchedule[i][j].id === id) {
                        // console.log('Строка ' + i + '  ' + j);
                        stopCycle= true;
                        break;
                    }
                }
            if (stopCycle === true) 
            {
                break;
            }   
        }

        // Блок удаления текущей строки
        stBaseSchedule.splice(i , 1);

        setBaseShedule(stBaseSchedule); // Изменяем базовую таблицу
        setShowSchedule(stBaseSchedule); // Видоизменяем таблицу на странице
    }

    function f_makeBlink(id) {
        setBaseShedule(stBaseSchedule.map( sched => {
                sched.map(field1 => {
                    if (field1.id === id ) {
                        let exist = ('teach1' in field1)
                     
                        if (!exist) {
                            field1.teach1 ='Препод';
                            field1.subj1 ='Предмет';
                        } else if (exist) {
                            delete field1.teach1;
                            delete field1.subj1;
                        }
                    }
                });
                return sched;
            }));
            setShowSchedule(stBaseSchedule);
    }


    // Сортировка таблицы по преподам
    function setSort( surname) {
        if (surname == 'Все') {
            setMode(0);
            setShowSchedule(stBaseSchedule);
            
        } else {
            setMode(1);
        let arrTeach = [];
        for (let arr of stBaseSchedule) {
            for(let cell of arr) {
                if ((cell.teach === surname) &&  !('teach1' in cell)) {
                    arrTeach.push([cell]);
                } 
                 if ('teach1' in cell) {
                    if ((cell.teach === surname) &&  (cell.teach1 !== surname)) {
                        let cell1 = {}; 
                        // Воспроизводим структуру существующего объекта
                        for(let key in cell) {
                            cell1[key] = cell[key];
                        }
                        cell1.subj1=' ';
                        cell1.teach1='  ';
                        cell1.aud1='   ';
                        cell1.type1='empty';
                        // cell1.showGr=2;
                        arrTeach.push([cell1]);
                    } 
                      if ((cell.teach1 === surname)  && (cell.teach !== surname)) {
                        let cell1 = {};
                        for(let key in cell) {
                            cell1[key] = cell[key];
                        }
                        cell1.subj=' ';
                        cell1.teach='  ';
                        cell1.aud='   ';
                        cell1.type='empty';
                        // cell1.showGr=1;
                        arrTeach.push([cell1]);
                    }
                }
            }
          
        }
        setShowSchedule(arrTeach);
     }
    }

    // Отображение информации в браузере

    return <div className='parent'>
          <div className='leftColomn' >
          
                <div class='selectTeacher'>
                    <span > Выбор расписания преподавателя</span>
                    <select 
                            value={valueSelect} 
                            onChange={(event) => {setValueSelect(event.target.value); 
                                                  setMode(1);
                                                  setSort(event.target.value)}}
                    >
                        {surnames}
                    </select>    
            </div> 
            <input type="radio" name="radio"  value="1" 
              checked={stRadio ==='1' ? true : false} 
              onChange={changeRadio}
              onClick={() =>{setMode(0); setShowSchedule(stBaseSchedule); setValueCourse(1)}}
            /> 
            <span>1 курс</span>
            <br/>
            <input type="radio" name="radio"  value="2" 
              checked={stRadio ==='2' ? true : false} 
              onChange={changeRadio}
              onClick={() => {setMode(0); setShowSchedule(stBaseSchedule); setValueCourse(2)}}
            /> 
             <span>2 курс</span>
            <br/>
            <button className='btnCourse' onClick={()=> {setMode(0)}}>Просмотр</button>
            <button className='btnCourse' onClick={()=> {setMode(2)}}>Редактирование</button>
            <button onClick ={() => {console.log(stValueCourse); 
            // console.log(timeMond); console.log(stBaseSchedule); console.log(structTuesd)
                }}> Печать таблицы на консоль </button>
            <button onClick ={() => {console.log(stShowSchedule)}}> Печать  на консоль группы </button>
            {/* При выбранном режиме, выранная кнопка должна подствечиваться цветом */}
            <button>Просмотр таблицы</button>
            <button>Редактирование таблицы</button>
         </div >
         <div className ='time'>
            {mapTimeMond}
            {mapTimeTuesd}
            {mapTimeWedn} 
            {mapTimeThurs}
            {mapTimeFri} 
         </div>
         <div className='child'>
                {headOfTable}
                <table className='talbeAll'> 
                    <tbody>
                       <td className='dayName' colspan={stWidthDay}> 
                            Понедельник
                        </td>
                            {rowsMond}
                        <td className='dayName' colspan={stWidthDay}> 
                            Вторник
                        </td>  
                            {rowsTuesd}
                        <td className='dayName' colspan={stWidthDay}> 
                            Среда
                        </td>    
                            {rowsWedn}
                        <td className='dayName' colspan={stWidthDay}> 
                            Четверг 
                        </td>   
                            {rowsTuesd}
                        <td className='dayName' colspan={stWidthDay}> 
                            Пятница
                         </td>  
                            {rowsFri}
                            
                    </tbody>
                </table> 
          </div>  
    </div>
}


export default Schedule;