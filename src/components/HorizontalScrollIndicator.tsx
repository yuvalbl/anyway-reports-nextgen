export default function HorizontalScrollIndicator() {
  return (
    <div className="md:hidden flex items-center justify-end gap-2 py-1 text-sm text-gray-600">
      <span className="text-right">ניתן לגלול לצד</span>
      <svg 
        className="w-4 h-4 transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
    </div>
  )
} 