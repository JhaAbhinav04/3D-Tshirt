import React from 'react';
import state from '../store';
import { useSnapshot } from 'valtio';

const CustomButton = ({type, title,customStyles,handleClick}) => {
  const generateStyle = (type) => {
    const snap = useSnapshot(state);

    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#fff'
      }
    } else if (type === 'outlined') {
      return {
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid #000'
      }
    }
  }
  
  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>
      {title}
    </button>
  )
}

export default CustomButton;