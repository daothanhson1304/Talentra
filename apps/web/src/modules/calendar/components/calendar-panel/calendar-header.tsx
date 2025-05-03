export default function CalendarHeader() {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='text-xl font-medium'>
        Apr – May <span className='text-gray-400'>2025</span>
      </div>
      <div className='space-x-2'>
        <button>←</button>
        <button>→</button>
        <button>Week</button>
        <button>📅</button>
      </div>
    </div>
  );
}
