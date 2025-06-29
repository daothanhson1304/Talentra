import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

import useTaskStore from '@/modules/task/hooks/use-task-store';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@talentra/ui/components/tooltip';
import { AUTO_SAVE_SPINNER_DURATION_MS } from '@/constants';

export default function RefreshIcon() {
  const { isSavingBulkTask } = useTaskStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [canStopSpinning, setCanStopSpinning] = useState(false);

  useEffect(() => {
    if (isSavingBulkTask && !isSpinning) {
      setIsSpinning(true);
      setCanStopSpinning(false);

      setTimeout(() => {
        setCanStopSpinning(true);
      }, AUTO_SAVE_SPINNER_DURATION_MS);
    }
  }, [isSavingBulkTask, isSpinning]);

  useEffect(() => {
    if (canStopSpinning && !isSavingBulkTask) {
      setIsSpinning(false);
      setCanStopSpinning(false);
    }
  }, [canStopSpinning, isSavingBulkTask]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button>
          <RefreshCw
            size={16}
            className={`cursor-pointer text-primary-foreground transition-all duration-300 ${
              isSpinning ? 'animate-spin' : ''
            }`}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>{isSpinning ? 'Saving' : 'Refresh'}</TooltipContent>
    </Tooltip>
  );
}
