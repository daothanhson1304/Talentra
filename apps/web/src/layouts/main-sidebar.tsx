export function MainSidebar() {
  return (
    <aside className='w-16 bg-black text-white flex flex-col items-center py-4 gap-4'>
      <SidebarIcon icon='📋' />
      <SidebarIcon icon='📅' />
      <SidebarIcon icon='⚙️' />
      <div className='mt-auto mb-4'>
        <UserAvatar initials='DA' />
      </div>
    </aside>
  );
}

function SidebarIcon({ icon }: { icon: string }) {
  return <div className='text-xl p-2 hover:bg-gray-700 rounded'>{icon}</div>;
}

function UserAvatar({ initials }: { initials: string }) {
  return (
    <div className='w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center'>
      {initials}
    </div>
  );
}
