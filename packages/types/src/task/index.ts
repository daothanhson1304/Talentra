export interface Task {
  id: string;
  title: string;
  day: string | null;
  slotCount: number;
  startSlot: number;
  scheduled: boolean;
}
