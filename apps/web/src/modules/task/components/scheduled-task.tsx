import { SLOT_DURATION_MINUTES, SLOT_HEIGHT_PX } from "@/constants/calendar";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@ttrak/ui/lib/utils";
import { useEffect, useRef, useState } from "react";
import useTaskStore from "../hooks/use-task-store";
import { Task } from "../stores/slice/task-slice";
import { MoveRight } from "lucide-react";

export type ScheduledTaskProps = Pick<
  Task,
  "id" | "slotCount" | "title" | "startSlot"
> & {
  style?: React.CSSProperties;
  isFirstInGroup?: boolean;
};

export default function ScheduledTask({
  title,
  id,
  startSlot,
  slotCount,
  isFirstInGroup,
  style: externalStyle,
}: ScheduledTaskProps) {
  const [isResizing, setIsResizing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { getTaskById, draftTask, updateTaskSlotCount } = useTaskStore();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: getTaskById(id),
    disabled: isResizing,
  });

  const style = {
    top: `${(startSlot ?? 0) * SLOT_HEIGHT_PX}px`,
    height: `${slotCount * SLOT_HEIGHT_PX}px`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    ...externalStyle,
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Đổi 0 thành 12 cho định dạng 12 giờ
    return `${formattedHours}:${mins.toString().padStart(2, "0")} ${period}`;
  };

  // Tính thời gian bắt đầu và kết thúc
  const startTime = formatTime(startSlot * SLOT_DURATION_MINUTES);
  const endTime = formatTime((startSlot + slotCount) * SLOT_DURATION_MINUTES);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const clearResize = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const offsetY = e.clientY - rect.top;
      const newSlotCount = Math.max(1, Math.round(offsetY / SLOT_HEIGHT_PX));
      updateTaskSlotCount(id, newSlotCount);
    };

    const handleMouseUp = () => {
      clearResize();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  if (startSlot === null) return null;

  return (
    <div
      className={cn(
        "absolute z-10 overflow-hidden bg-layer1 border border-aqua-breeze text-white text-xs rounded p-1 transition-opacity duration-100",
        {
          "opacity-0 pointer-events-none": draftTask?.id === id,
          "opacity-100": !draftTask,
          "cursor-pointer": !isResizing,
        },
      )}
      style={style}
    >
      <div
        className="w-full h-full flex items-start gap-2 cursor-pointer"
        ref={(node) => {
          setNodeRef(node);
          ref.current = node;
        }}
        {...(!isResizing ? listeners : {})}
        {...attributes}
      >
        <div className="h-full w-1 bg-aqua-breeze rounded-sm"></div>
        <div className="flex-1 flex flex-col gap-1.5 h-full">
          {slotCount > 1 && (
            <p className="text-xs flex items-start gap-1">
              <span>{startTime}</span>
              <MoveRight size={12} />
              <span>{endTime}</span>
            </p>
          )}
          <p>{title}</p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
