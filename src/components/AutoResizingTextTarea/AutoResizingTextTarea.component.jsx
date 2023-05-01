import React, { useState, useRef, useEffect } from 'react';
import './AutoResizingTextTarea.css'

const AutoResizingTextarea = (props) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    autoResize();
  }, [props.value]);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <textarea
      {...props}
      ref={textareaRef}
      onChange={handleChange}
      style={{ ...props.style, overflow: 'hidden', resize: 'none', }}
    />
  );
};

export default AutoResizingTextarea;