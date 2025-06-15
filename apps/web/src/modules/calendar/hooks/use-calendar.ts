import { useDispatch, useSelector } from 'react-redux';
import {
  snappedHeightSelector,
  snappedMinutesSelector,
  widthPerDaySelector,
} from '../stores/selector/calendar-selector';
import { setWidthPerDay as setWidthPerDayAction } from '../stores/slice/calendar-slice';

const useCalendar = () => {
  const dispatch = useDispatch();

  const snappedHeight = useSelector(snappedHeightSelector);
  const snappedMinutes = useSelector(snappedMinutesSelector);
  const pixelsPerMinute = (snappedHeight * 2) / (60 / snappedMinutes);
  const widthPerDay = useSelector(widthPerDaySelector);

  const setWidthPerDay = (width: number) => {
    dispatch(setWidthPerDayAction(width));
  };
  return {
    snappedHeight,
    snappedMinutes,
    pixelsPerMinute,
    widthPerDay,
    setWidthPerDay,
  };
};

export default useCalendar;
