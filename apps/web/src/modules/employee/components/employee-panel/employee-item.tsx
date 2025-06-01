import { Employee } from "@ttrak/types/employee";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ttrak/ui/components/avatar";
interface EmployeeItemProps {
  employee: Employee;
}

export default function EmployeeItem({ employee }: EmployeeItemProps) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="w-10 h-10 border border-border flex items-center justify-center bg-white text-primary">
        <AvatarImage src={employee.avatar} />
        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex gap-1 justify-between flex-1">
        <div>
          <h3 className="text-sm font-medium">{employee.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{employee.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground text-primary">
            {employee.totalHours} Hrs
          </p>
        </div>
      </div>
    </div>
  );
}
