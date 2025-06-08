import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '@ttrak/types/employee';

export interface EmployeeState {
  selectedEmployeeId: string | null;
  employees: Employee[];
}

const initialState: EmployeeState = {
  selectedEmployeeId: null,
  employees: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Robert Smith',
      email: 'robert@example.com',
      phone: '098-765-4321',
      address: '456 Oak Ave',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Kyle Nelson',
      email: 'kyle@gmail.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      name: 'Danny Smith',
      email: 'danny@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      name: 'Albert Do',
      email: 'albert@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '6',
      name: 'Neo Daniels',
      email: 'neo@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '7',
      name: 'Wayne Johnson',
      email: 'wayne@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '8',
      name: 'James Martin',
      email: 'james@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '9',
      name: 'Victor Johnson',
      email: 'victor@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '10',
      name: 'Bella Cline',
      email: 'bella@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '11',
      name: 'Bella Cline',
      email: 'bella@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
    {
      id: '12',
      name: 'Bella Cline',
      email: 'bella@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      totalHours: 10,
      totalTasks: 10,
      avatar: 'https://via.placeholder.com/150',
    },
  ],
};

const employeeSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelectedEmployeeId: (state, action: PayloadAction<string | null>) => {
      state.selectedEmployeeId = action.payload;
    },
  },
});

export const { setSelectedEmployeeId } = employeeSlice.actions;
export default employeeSlice.reducer;
