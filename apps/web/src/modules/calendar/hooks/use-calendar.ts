import { useDispatch, useSelector } from 'react-redux';
import {
  currentWeekOffsetSelector,
  currentWeekSelector,
  snappedHeightSelector,
  snappedMinutesSelector,
  widthPerDaySelector,
} from '../stores/selector/calendar-selector';
import { setWidthPerDay as setWidthPerDayAction } from '../stores/slice/calendar-slice';
import { getCurrentWeekDays } from '../helpers/date';

const useCalendar = () => {
  const dispatch = useDispatch();

  const currentWeek = useSelector(currentWeekSelector);
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const snappedHeight = useSelector(snappedHeightSelector);
  const snappedMinutes = useSelector(snappedMinutesSelector);
  const pixelsPerMinute = (snappedHeight * 2) / (60 / snappedMinutes);
  const widthPerDay = useSelector(widthPerDaySelector);

  const setWidthPerDay = (width: number) => {
    dispatch(setWidthPerDayAction(width));
  };

  const daysOfWeek = getCurrentWeekDays(currentWeekOffset);

  return {
    snappedHeight,
    snappedMinutes,
    pixelsPerMinute,
    widthPerDay,
    setWidthPerDay,
    currentWeek,
    currentWeekOffset,
    daysOfWeek,
  };
};

export default useCalendar;
