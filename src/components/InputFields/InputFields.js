import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import './InputFeilds.css';


const InputFields = (props) => (
  <div className="search-field">
    <InputBase
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'white',
        fontWeight: 'bold',
        minWidth: '650px',
        padding: '8px'
      }}
      className="input"
      value={props.value}
    />
  </div>
)

export default InputFields;
