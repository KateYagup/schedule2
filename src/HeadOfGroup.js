import React, {useState} from "react";

function HeadOfGroup({id, group,  isEdit,  toggleModeHead, editHeadGroup,
                      changeGroupsColumn}) {

    let cell;

    isEdit
    ? cell = <input value={group} onChange={event => editHeadGroup(id, event)}
                                  onBlur={event => changeGroupsColumn(id, event)}/>
    : cell = <span> {group}</span>


    return <th className='cellHeadParameters' 
               onDoubleClick={() => {toggleModeHead(id)}}>
        {cell}
    </th>
}

export default HeadOfGroup;