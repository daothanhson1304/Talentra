import { useEffect, useRef } from 'react';
import useTaskStore from '../hooks/use-task-store';
import { useUpdateTasksMutation } from '../stores/api/task.api';
import { AUTO_SAVE_DELAY_MS } from '@/constants';

const AutoSaveTasks = () => {
  const { syncWithOriginal, editedTasks, originalTasks, setIsSavingBulkTask } =
    useTaskStore();
  const [updateTasks, { isLoading }] = useUpdateTasksMutation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isChanged =
      JSON.stringify(editedTasks) !== JSON.stringify(originalTasks);

    if (!isChanged) return;

    // Clear existing timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updateTasks(Object.values(editedTasks).flat())
        .unwrap()
        .then(() => {
          syncWithOriginal();
        })
        .catch((err: any) => {});

      timeoutRef.current = null;
    }, AUTO_SAVE_DELAY_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [editedTasks, originalTasks, updateTasks, syncWithOriginal]);

  useEffect(() => {
    setIsSavingBulkTask(isLoading);
  }, [isLoading]);

  return null;
};

export default AutoSaveTasks;
