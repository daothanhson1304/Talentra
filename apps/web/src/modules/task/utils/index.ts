import { Task } from '@talentra/types/task';

type PositionedTask = Task & {
  left: number;
  width: number;
  zIndex: number;
  isFirstInGroup: boolean;
};

function areOverlapping(a: Task, b: Task) {
  return (
    a.startSlot < b.startSlot + b.slotCount &&
    b.startSlot < a.startSlot + a.slotCount
  );
}

function groupOverlappingTasks(tasks: Task[]): PositionedTask[] {
  const positionedTasks: PositionedTask[] = [];

  const sortedTasks = [...tasks].sort((a, b) => a.startSlot - b.startSlot);

  let group: Task[] = [];

  for (const task of sortedTasks) {
    if (group.length === 0 || group.some(t => areOverlapping(t, task))) {
      group.push(task);
    } else {
      assignPositionsToGroup(group, positionedTasks);
      group = [task];
    }
  }

  if (group.length > 0) {
    assignPositionsToGroup(group, positionedTasks);
  }

  return positionedTasks;
}

function assignPositionsToGroup(group: Task[], result: PositionedTask[]) {
  const total = group.length;

  group.forEach((task, i) => {
    const width = 100 / total;
    const left = i * width;

    result.push({
      ...task,
      left,
      width,
      zIndex: i + 1,
      isFirstInGroup: i === 0,
    });
  });
}

export { groupOverlappingTasks };
export type { PositionedTask };
