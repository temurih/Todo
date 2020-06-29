import React, { useState } from 'react';
import { Todo, DATE } from '../../App';
import ArrowDown from './ArrowDown';
import DateSelector from './dateSelector.tsx/DateSelector';

export const getLabel = (date: DATE | undefined): string => {
    switch (date) {
        case DATE.TODAY:
            return 'Today';
        case DATE.TOMORROW:
            return 'Tomorrow';
        case DATE.THIS_WEEK:
            return 'This Week';

        default:
            return 'No Date';
    }
};

const getFillColor = (date: DATE | undefined): string => {
    switch (date) {
        case DATE.TODAY:
            return '#ff006e';
        case DATE.TOMORROW:
            return '#fb5607';
        case DATE.THIS_WEEK:
            return '#ffbe0b';

        default:
            return '#6b6f7c';
    }
};

interface DatePickerProps {
    item: Todo;
    handleDateChange: (todo: Todo, newDate: DATE | undefined) => unknown;
}

const DatePicker: React.FC<DatePickerProps> = ({ item, handleDateChange }) => {
    const [show, setShow] = useState<boolean>(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleDate = (newDate: DATE | undefined) => {
        handleClose();
        handleDateChange(item, newDate);
    };
    return (
        <>
            <div
                onClick={handleOpen}
                className={`
                        item-select
                        ${
                            item.date
                                ? item.date + '-item-select'
                                : 'regular-item-select'
                        }
                    `}
            >
                {getLabel(item.date)}
                <ArrowDown
                    fill={getFillColor(item.date)}
                    className="arrow-down"
                />
            </div>
            {show && (
                <DateSelector date={item.date} handleDateChange={handleDate} />
            )}
        </>
    );
};

export default DatePicker;
