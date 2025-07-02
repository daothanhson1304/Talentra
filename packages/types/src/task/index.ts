export interface Task {
  _id: string;
  title: string;
  day: string | null;
  slotCount: number;
  startSlot: number;
  scheduled: boolean;
  description: string;
  importance: Importance;
  status: string;
}

export enum Importance {
  low = 'low',
  medium = 'medium',
  high = 'high',
  urgent = 'urgent',
}
