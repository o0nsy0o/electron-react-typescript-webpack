import React, { useEffect } from 'react';
import IFileSelectProps from './propstype';
const inputObj = document.createElement('input');
export function FileSelect(props: IFileSelectProps) {
  const updatePath = () => {
    console.log(inputObj.files);
    props.onChange(inputObj.files);
  };
  useEffect(() => {
    inputObj.setAttribute('id', '_ef');
    inputObj.setAttribute('type', 'file');
    inputObj.setAttribute('display', 'none');
    inputObj.setAttribute('webkitdirectory', '');
    inputObj.setAttribute('directory', '');
    inputObj.addEventListener('change', updatePath);
    return () => {
      inputObj.removeEventListener('change', updatePath);
    };
  });

  return (
    <div onClick={() => { inputObj.click(); }}>
      {props.children}
    </div>
  );
}
