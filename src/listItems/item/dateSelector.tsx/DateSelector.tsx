import React from 'react';
import './dateSelector.css';
import { DATE, options } from '../../../App';
import { getLabel } from '../DatePicker';

interface DateSelectorProps {
    date: DATE | undefined;
    handleDateChange: (newDate: DATE | undefined) => unknown;
}

const DateSelector: React.FC<DateSelectorProps> = ({
    date,
    handleDateChange,
}) => {
    return (
        <div className="drop-down">
            {options.map((o, i) => (
                <div
                    key={i}
                    onClick={() => handleDateChange(o)}
                    className={`date-selector ${
                        o === date ? o + '-selected' : ''
                    } ${o ? o + '-date-selector' : 'regular-date-selector'}`}
                >
                    {getLabel(o)}
                </div>
            ))}
        </div>
    );
};

export default DateSelector;
