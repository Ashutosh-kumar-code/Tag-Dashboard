// import React from 'react';
// const Button = ({ onClick = () => { }, children = 'Add Company', className = '', icon = '' }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={` bg-danger text-white flex justify-center items-center gap-1
//           md:py-2 py-1 md:px-6 px-2 rounded-lg md:text-[18px] text-sm font-normal hover:bg-[#5c1a23]
//           ${className}`}
//     >
//       <span className='font-normal'>{children}</span>{' '}
//       <span>
//         {icon}
//       </span>
//     </button>
//   );
// };

// export default Button;




{/* <button onClick={handleComapnyModel} className="list-add-btn">
<span>Add Company</span>{" "}
<span>
  <Icons.add size={20} />
</span>
</button> */}





import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '../../utils/cn'

const buttonVariants = cva(
  'flex justify-center items-center gap-1 md:py-2 py-1 md:px-6 px-2 rounded-lg md:text-[18px] text-sm font-normal',
  {
    variants:{
      bgColor:{
        btndanger:'bg-[#78222E] text-white hover:bg-[#5c1a23]',
        disable:'bg-gray-300 text-gray-700 hover:bg-gray-400'
      }
    },
    defaultVariants:{
      bgColor:'btndanger',
    }
})

const Button = ({ onClick = () => {},type='button', children, className = '', icon = '', bgColor = 'btndanger' }) => {
  return (
    <button type={type}
      onClick={onClick}
      className={cn(buttonVariants({ className, bgColor }))}
    >
      <span className='font-normal'>{children}</span>{' '}
      <span>{icon}</span>
    </button>
  );
};


export default Button;