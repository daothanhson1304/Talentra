import { DragOverlay } from '@dnd-kit/core';
import useTaskStore from '@/modules/task/hooks/use-task-store';
import TaskItem from '@/modules/task/components/task-panel/task-item';
import useDragDrop from '../hooks/use-drag-drop';
import ScheduledTask from '@/modules/task/components/scheduled-task';
import { AnimatePresence, motion } from 'framer-motion';

export default function DragOverlayContent() {
  const { draggingTask } = useTaskStore();
  const { isDragOver } = useDragDrop();

  if (!draggingTask || draggingTask.scheduled) return null;

  return (
    <DragOverlay dropAnimation={null}>
      <AnimatePresence mode='wait'>
        {isDragOver ? (
          <motion.div
            key='scheduled'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <ScheduledTask
              isDraft
              title={draggingTask.title}
              _id={draggingTask._id}
              startSlot={0}
              slotCount={12}
              description={draggingTask.description}
            />
          </motion.div>
        ) : (
          <motion.div
            key='unscheduled'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <TaskItem task={draggingTask} index={0} />
          </motion.div>
        )}
      </AnimatePresence>
    </DragOverlay>
  );
}
