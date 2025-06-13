export interface Task {
  id: string;
  title: string;
  day: string | null;
  slotCount: number;
  startSlot: number;
  scheduled: boolean;
  description: string;
  importance: Importance;
}

export enum Importance {
  low = 'low',
  medium = 'medium',
  high = 'high',
  urgent = 'urgent',
}
