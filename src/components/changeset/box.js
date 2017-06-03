import React from 'react';
export const Box = ({ children, pullDown, pullUp, className, style, bg }) => (
  <div className={`mb3 z4  bg-white ${className}`} style={style}>
    <div className="flex-parent flex-parent--row flex-parent--center-main">
      {pullDown}
    </div>
    <div className={`${bg} scroll-styled scroll-auto hmax480`}>
      {children}
    </div>
    <div className="flex-parent flex-parent--row flex-parent--center-main">
      {pullUp}
    </div>
  </div>
);