import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@talentra/ui/components/table';

const tasks = [
  {
    title: 'Design homepage',
    from: '03 Jul',
    to: '05 Jul',
    status: 'In Progress',
    type: 'Work day',
  },
  {
    title: 'Vacation',
    from: '06 Jul',
    to: '10 Jul',
    status: 'Completed',
    type: 'Vacation',
  },
  {
    title: 'Client meeting',
    from: '12 Jul',
    to: '12 Jul',
    status: 'Completed',
    type: 'Work day',
  },
  {
    title: 'Sick leave',
    from: '20 Jul',
    to: '22 Jul',
    status: 'Pending',
    type: 'Sickness',
  },
];

export function TasksTable() {
  return (
    <div className='rounded-xl bg-layer2 p-6 shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>Employee Tasks - July</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, idx) => (
            <TableRow key={idx}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.from}</TableCell>
              <TableCell>{task.to}</TableCell>
              <TableCell>
                <span
                  className={
                    task.status === 'Completed'
                      ? 'text-green-600'
                      : task.status === 'In Progress'
                        ? 'text-yellow-600'
                        : 'text-gray-500'
                  }
                >
                  {task.status}
                </span>
              </TableCell>
              <TableCell>{task.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function HeaderStats() {
  return (
    <div className='rounded-xl bg-layer2 p-6 shadow-md'>
      <div className='text-2xl font-semibold mb-4'>264.00 hrs / $2,647</div>
      <div className='grid grid-cols-3 gap-4 text-sm font-medium'>
        <div>
          <p className='text-yellow-600'>Work day</p>
          <div
            className='bg-yellow-200 h-2 rounded mt-1'
            style={{ width: '80%' }}
          />
          <p className='mt-1'>167 hrs</p>
        </div>
        <div>
          <p className='text-black'>Truancy</p>
          <div className='bg-black h-2 rounded mt-1' style={{ width: '20%' }} />
          <p className='mt-1'>43 hrs</p>
        </div>
        <div>
          <p className='text-gray-600'>Vacation</p>
          <div
            className='bg-gray-300 h-2 rounded mt-1'
            style={{ width: '35%' }}
          />
          <p className='mt-1'>74 hrs</p>
        </div>
      </div>
    </div>
  );
}
