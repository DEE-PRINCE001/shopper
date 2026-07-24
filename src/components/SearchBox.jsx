import React, { forwardRef } from 'react';
import { Search } from 'lucide-react'; 


const SearchBox = forwardRef(({ 
  placeholder = "Search here...", 
  icon,
  size = "md",
  rightElement,
  className = '', 
  ...props 
}, ref) => {

  const sizeVariants = {
    "mb":"w-full p-3 lg:w-150 xl:w-100",
    "xm":"w-full py-2",
    "at":"w-full p-3",
    "md":"w-40 py-1 md:w-60 md:py-2",
    "lg": "w-87.5 h-15 py-0.5"
  }
  return (
    <div className={`
      flex items-center bg-secondary rounded-full px-5 ${sizeVariants[size]}
      border border-transparent shadow-sm transition-all duration-200
      focus-within:ring-1 focus-within:ring-primary focus-within:border-primary
      ${className}
    `}>
      {/* Search Icon */}
      <div  className="text-primary flex items-center justify-center mr-3 select-none">
        {icon || <Search size={20} strokeWidth={2.5} />}
      </div>

      {/* Input Field */}
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="
          w-full bg-secondary text-sm font-normal text-primary 
          placeholder:text-gray-500 focus:outline-none
        "
        {...props}
      />

      {/*Optional right element */}
      {rightElement && (
        <div className="ml-2 flex items-center justify-center">
          {rightElement}
        </div>
      )}
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;