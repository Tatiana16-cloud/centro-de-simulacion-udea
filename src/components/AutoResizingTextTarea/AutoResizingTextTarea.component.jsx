import React, { useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import './AutoResizingTextTarea.css'

const AutoResizingTextarea = ({value, onChange, isDate}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    let _value = value;
    //if(isDate) _value
    setText(_value)
    if(_value) autoResize();
  }, [value]);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
    autoResize();
    onChange(event.target.value)
  };

  return (
    <div>
      {
        isDate && 
        <TextField
          label="Fecha"
          variant='outlined'
          onChange={handleChange}
          value={text}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      }
      {
        !isDate && 
        <TextField
          label=""
          multiline
          rows={1}
          rowsMax={10}
          variant='outlined'
          onChange={handleChange}
          value={text}
        />
      }
    </div>
    
  );
};

export default AutoResizingTextarea;