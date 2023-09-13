export default function Input({children, className = '', ...props}) {
  return (
    <div className={`${className}`}>

      <div>
        {children}
      </div>

      <div>
        <input
          className={'bg-gray-200 w-full appearance-none border-2 border-gray-200 rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'}
          {...props}
        />
      </div>
      
    </div>
  )
}