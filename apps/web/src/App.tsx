import AppLayout from './layouts/app-layout';
import AutoSaveTasks from './modules/task/components/auto-save-tasks';
import { Toaster } from '@talentra/ui/components/sonner';

function App() {
  return (
    <>
      <AppLayout />
      <AutoSaveTasks />
      <Toaster className='toaster' />
    </>
  );
}

export default App;
