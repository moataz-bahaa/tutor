import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useMonths = () => {
  const [months, setMonths] = useState<{ monthId: number; monthText: string }[]>([]);
  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const res = await axios.get('/Dates/Select/Months');
        setMonths(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    fetchMonths();
  }, []);

  return months;
};
