export default function Button({className = '', children, ...props}) {
  return (
    <button
      className={`${className} bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full`}
      {...props}
    >
      {children}
    </button>
  )
}