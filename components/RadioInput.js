'use client'

import { useState } from "react";

export default function RadioInput({options, id, onChange, children, className = '', ...props}) {
  const [selectedId, setSelectedId] = useState('');

  /* Prepare fields */
  const opts = options.map((option, index) => {
    const optId = `${id}-${index}`;
    return (
      <div key={index} className={'flex items-center gap-1'}>
        <input
          type={'radio'}
          id={optId}
          className={'block'}
          value={option.value}
          onChange={onChange}
          onClick={(e) => setSelectedId(e.target.id)}
          checked={optId == selectedId}
        />
        <label htmlFor={optId} className={'block'}>{option.label}</label>
      </div>
    )
  });

  return (
    <div className={`${className}`}>
      {/* Label */}
      <div>
        {children}
        {props?.required ? <span className={'font-bold text-red-500'}> *</span> : <></>}
      </div>

      {/* Fields */}
      {opts}
    </div>
  )
}