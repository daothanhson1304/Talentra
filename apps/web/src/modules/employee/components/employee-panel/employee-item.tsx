import { Employee } from '@talentra/types/employee';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@talentra/ui/components/avatar';
interface EmployeeItemProps {
  employee: Employee;
  onSelect: (id: string) => void;
}

export default function EmployeeItem({
  employee,
  onSelect,
}: Readonly<EmployeeItemProps>) {
  return (
    <div
      className='flex items-start gap-4 cursor-pointer hover:bg-layer3 rounded-md p-2 '
      onClick={() => {
        onSelect(employee._id);
      }}
    >
      <Avatar className='w-10 h-10 border border-border flex items-center justify-center bg-white text-primary'>
        <AvatarImage src={employee.avatar} />
        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className='flex gap-1 justify-between flex-1'>
        <div>
          <h3 className='text-sm font-medium'>{employee.name}</h3>
          <p className='text-sm text-muted-foreground'>{employee.email}</p>
        </div>
      </div>
    </div>
  );
}
