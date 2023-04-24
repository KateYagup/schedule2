import React, { useState }  from 'react';
// import FieldSubject from './FieldSubject';
// import FieldGroup from './FieldGroup';
// import FieldTeacher from './FieldTeacher';
// import FieldAud from './FieldAud';
// import FieldType from './FieldType';

function RowOfSched({cell, id, f_showOperations, f_addColumn, f_deleteColumn, 
                     f_addRowEnd, f_deleteRowEnd, f_makeBlink}) {
  let showCell;
  let cell1; // Верхняя часть ячейки
  let cell2;  // Нижяя часть мигалки
  // let _showControls; // использование флага 


   //  Раскраска полей
   let type, type1;
   if ('teach1' in cell) {
      if (cell.type === 'lec') {
          type='lecture';
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

  // if (cell.showControls === true)
  //  {
  //   _showControls = <div>
  //       <a href='#' onClick ={(event) => { f_addColumn(id); event.preventDefault()}}>
  //         Добавить столбец </a> 
  //       <a href='#' onClick ={(event) => { f_deleteColumn(id); event.preventDefault()}}>
  //         Удалить столбец </a>
  //       <br/>
  //       <a href='#' onClick ={(event) => { f_addRowEnd(id); event.preventDefault()}}>
  //         Добавить строку </a>
  //       <a href='#' onClick ={(event) => { f_deleteRowEnd(id); event.preventDefault()}}>
  //         Удалить строку</a>
  //       <br/>
  //       <a href='#' onClick ={(event) => { f_makeBlink(id); event.preventDefault()}}>
  //         Мигалка </a>
  //   </div>
  // }

   cell1 = <div className={type}>
                  <span className='spanSubj'>
                     {cell.subj}
                  </span>
                  <br/>
                  <span className="spanTeacher">
                    {cell.teach}
                  </span>
                  <span className="spanAud">
                    {cell.aud}
                  </span>
                  <span className="spanType">
                    {cell.type}
                  </span>   
              </div> 
              
 
if ('teach1' in cell) {
    cell2 = <div className={type1}>
                <span className='spanSubj'>
                  {cell.subj1}
                </span>
                <br/>
                <span className="spanTeacher">
                  {cell.teach1}
                </span>
                <span className="spanAud">
                  {cell.aud1}
                </span>
                <span className="spanType">
                   {cell.type1}
                </span>   
  </div> 
}

  showCell = <div className='cellPatameters' onDoubleClick={() => {console.log(cell.showControls); f_showOperations(id)}}> 
      {cell1}   
      {cell2}   
      {/* {_showControls}          */}
  </div>

  return <td className='cellFrame'>
    {showCell}
  </td>
}

export default RowOfSched;