import React, { useState }  from 'react';
import FieldSubject from './FieldSubject';
import FieldGroup from './FieldGroup';
import FieldTeacher from './FieldTeacher';
import FieldAud from './FieldAud';
import FieldType from './FieldType';

function RowOfSchedEdit({id, cell,  optionsSubj, changeField, f_showOperations, f_addColumn, f_deleteColumn, 
                     f_addRowEnd, f_deleteRowEnd, f_makeBlink}) {
  let showCell;
  let cell1; // Верхняя часть ячейки
  let cell2;  // Нижяя часть мигалки
  let _showControls; // использование флага 


   //  Раскраска полей
   let type, type1, cellPatameters = 'cellPatameters1';
   if ('teach1' in cell) {
      if (cell.type === 'lec') {
          type='lecture redClass';
      } 
        if (cell.type === 'pr') {
          type='practice';
      } 
        if (cell.type === 'lab') {
          type='laboratory';
      }

      if (cell.type1 === 'lec') {
          type1='lecture';
      } 
        if (cell.type1 === 'pr') {
          type1='practice';
      } 
        if (cell.type1 === 'lab') {
          type1='laboratory';
      }
} else {
  if (cell.type === 'lec') {
    type='lecture1';
} 
  if (cell.type === 'pr') {
    type='practice1';
} 
  if (cell.type === 'lab') {
    type='laboratory1';
}

}

  if (cell.showControls === true)
   {
    cellPatameters = 'cellPatameters2';
    _showControls = <div>
     <span className='menuParam'> Столбец  </span> 
        <a href='#'  className='menuParam' onClick ={(event) => { f_addColumn(id); event.preventDefault()}}>
          добавить </a> 
        <a href='#' className='menuParam'  onClick ={(event) => { f_deleteColumn(id); event.preventDefault()}}>
          удалить </a>
        <br/>
        <span className='menuParam'> Строку  </span> 
        <a href='#' className='menuParam' onClick ={(event) => { f_addRowEnd(id); event.preventDefault()}}>
          добавить  </a>
        <a href='#' className='menuParam' onClick ={(event) => { f_deleteRowEnd(id); event.preventDefault()}}>
          удалить </a>
        <br/>
        <a href='#' className='menuParam' onClick ={(event) => { f_makeBlink(id); event.preventDefault()}}>
          Мигалка </a>
    </div>
  }

   cell1 = <div className={type} >
                  <FieldSubject 
                      id = {id}
                      type='subj'
                      subj={cell.subj}
                      optionsSubj={optionsSubj}
                      changeField={changeField}
                  />
                  <br/>
                 <FieldTeacher
                   teach={cell.teach}
                 />
                 <FieldAud 
                    aud={cell.aud}
                  />
                  <FieldType
                    type={cell.type}
                  />
              </div> 
              
 
if ('teach1' in cell) {
    cell2 = <div className={type1}>
            <FieldSubject 
                id = {cell.id}
                type='subj1'
                subj={cell.subj1}
                optionsSubj={optionsSubj}
                changeField={changeField}
            />
            <br/>
            <FieldTeacher
                teach={cell.teach1}
            />
            <FieldAud 
                 aud={cell.aud1}
            />
             <FieldType
                    type={cell.type1}
              />
             
  </div> 
}

  showCell = <div className={cellPatameters} onDoubleClick={() => {console.log(cell.showControls); f_showOperations(id)}}> 
      {cell1}   
      {cell2}   
      {_showControls}         
  </div>

  return <td className='cellFrame'>
    {showCell}
  </td>
}

export default RowOfSchedEdit;