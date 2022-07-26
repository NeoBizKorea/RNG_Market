import React from "react";

const Textarea = React.forwardRef(
  ({ className = "", children, rows = 4, ...args }, ref) => (
      <textarea
        ref={ref}
        className={`block w-full text-sm rounded-2xl border-2 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white ${className}`}
        rows={rows}
        {...args}
      >
        {children}
      </textarea>
    )
);

export default Textarea;
