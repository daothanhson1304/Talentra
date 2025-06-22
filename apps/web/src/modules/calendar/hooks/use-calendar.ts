import { useDispatch, useSelector } from 'react-redux';
import {
  currentWeekOffsetSelector,
  currentWeekSelector,
  snappedHeightSelector,
  snappedMinutesSelector,
  widthPerDaySelector,
  scrollTopSelector,
} from '../stores/selector/calendar-selector';
import {
  setWidthPerDay as setWidthPerDayAction,
  setScrollTop as setScrollTopAction,
} from '../stores/slice/calendar-slice';
import { getCurrentWeekDays } from '../helpers/date';

const useCalendar = () => {
  const dispatch = useDispatch();

  const currentWeek = useSelector(currentWeekSelector);
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const snappedHeight = useSelector(snappedHeightSelector);
  const snappedMinutes = useSelector(snappedMinutesSelector);
  const pixelsPerMinute = (snappedHeight * 2) / (60 / snappedMinutes);
  const widthPerDay = useSelector(widthPerDaySelector);
  const scrollTop = useSelector(scrollTopSelector);

  const setWidthPerDay = (width: number) => {
    dispatch(setWidthPerDayAction(width));
  };

  const setScrollTop = (scrollTop: number) => {
    dispatch(setScrollTopAction(scrollTop));
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
    scrollTop,
    setScrollTop,
  };
};

export default useCalendar;
