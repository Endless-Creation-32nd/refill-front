import dayjs from 'dayjs';
import { Dispatch, forwardRef, ReactNode, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';

import { addDays } from '../utils/addDays';

import Period from '../assets/search_period.svg';

interface FormType {
  name: string;
  description: string;
  tagList: string[];
  maxMember: number;
  startTime: Date | null;
  endTime: Date | null;
  perWeek: number;
  penalty: boolean;
}

interface PropsType {
  startTime: Date | null;
  endTime: Date | null;
  setForm: Dispatch<SetStateAction<FormType>>;
}
const CustomDatePicker: React.FC<PropsType> = ({
  startTime,
  endTime,
  setForm,
}) => {
  return (
    <DatePicker
      dateFormat='yyyy.MM.dd'
      customInput={<CustomInput />}
      popperModifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 30],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            rootBoundary: 'viewport',
            altAxis: true,
          },
        },
        {
          name: 'flip',
          options: {
            rootBoundary: 'document',
          },
        },
      ]}
      selectsRange={true}
      startDate={startTime}
      endDate={endTime}
      minDate={addDays(new Date(), 1)}
      onChange={(update) => {
        setForm((prev) => ({
          ...prev,
          startTime: update[0],
          endTime: update[1],
        }));
      }}
      required
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className='flex items-center justify-between px-2 py-2'>
          <span className='text-sm text-gray-700'>
            {dayjs(date).format('YYYY MMMM DD')}
          </span>

          <div className='space-x-2'>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type='button'
              className={`${
                prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
              } inline-flex rounded border border-gray-300 bg-white py-1 px-2 text-sm font-medium text-gray-700
                    shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0`}
            >
              {'<'}
            </button>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type='button'
              className={`${
                nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
              } inline-flex rounded border border-gray-300 bg-white py-1 px-2 text-sm font-medium text-gray-700
                    shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0`}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    />
  );
};

interface Props {
  children?: ReactNode;
  value?: string;
  onClick?: () => void;
}
type Ref = HTMLButtonElement;

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef<Ref, Props>(({ value, onClick }, ref) => {
  return (
    <button
      type='button'
      className='sm:text-md flex w-full items-center gap-2 rounded-lg border p-2 text-sm'
      onClick={onClick}
      ref={ref}
    >
      <Period />
      {value}
    </button>
  );
});

export default CustomDatePicker;
