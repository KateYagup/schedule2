import React, {cloneElement, useState} from 'react';

function FieldSubject({id, type, subj, optionsSubj, changeField}) {
 
       const [isEdit, setIsEdit] =  useState(false);

       let editCell = isEdit
       ? 
       <select 
               onChange={(event) => {console.log(event.target.value); console.log(id); changeField(id, type, event)}}
              //  onBlur={() =>{hideButtonBlink(id); 
              onBlur={(event) => {setIsEdit(false)}} 
               >
           {optionsSubj}
        </select>
      : <span onClick={() =>{setIsEdit(true) }}>
           {subj}
      </span>
   ;
   
   return editCell;

}

export default FieldSubject;