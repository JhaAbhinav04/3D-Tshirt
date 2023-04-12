import React from 'react';
// React color package
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      {/* view color selector */}
      <SketchPicker
        color={snap.color}
        disableAlpha            //opacity
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
};

export default ColorPicker