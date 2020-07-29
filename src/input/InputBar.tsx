import React, { useState, useRef, useEffect } from 'react';
import { Todo, DATE, STATUS } from '../App';
import './inputBar.css';
import { generateNewId } from '../idGenerator';

interface InputBarProps {
    handleAdd: (todo: Todo) => unknown;
}

const ENTER_KEY_CODE = 13;

const InputBar: React.FC<InputBarProps> = ({ handleAdd }) => {
    const [date, setDate] = useState<DATE | undefined>();
    const [text, setText] = useState<string>('');
    const ref = useRef<HTMLInputElement | null>(null);
    const handleChangeToday = () => setDate(DATE.TODAY);
    const handleChangeTomorrow = () => setDate(DATE.TOMORROW);
    const handleChangeThisWeek = () => setDate(DATE.THIS_WEEK);
    const handleChangeThisMonth = () => setDate(DATE.THIS_MONTH);
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === ENTER_KEY_CODE) {
            onAdd();
        }
    };
    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
    };
    const onAdd = () => {
        if (text.length === 0) return;
        handleAdd({
            id: generateNewId(),
            date,
            text,
            status: STATUS.PENDING,
        });
        setDate(undefined);
        setText('');
    };

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <div
            className={`main ${
                date ? date + '-main-shadow' : 'regular-main-shadow'
            }`}
        >
            <input
                ref={ref}
                value={text}
                onKeyPress={onKeyPress}
                onChange={handleChangeText}
                className={date ? date + '-input' : 'regular-input'}
                placeholder="What do you need to get done?"
            />
            <div className="capsule-wrapper">
                <div
                    onClick={handleChangeToday}
                    className={`capsule ${
                        date === DATE.TODAY
                            ? 'today-capsule'
                            : 'regular-capsule'
                    }`}
                >
                    Today
                </div>
                <div
                    onClick={handleChangeTomorrow}
                    className={`capsule ${
                        date === DATE.TOMORROW
                            ? 'tomorrow-capsule'
                            : 'regular-capsule'
                    }`}
                >
                    Tomorrow
                </div>
                <div
                    onClick={handleChangeThisWeek}
                    className={`capsule ${
                        date === DATE.THIS_WEEK
                            ? 'this-week-capsule'
                            : 'regular-capsule'
                    }`}
                >
                    This Week
                </div>
                <div
                    onClick={handleChangeThisMonth}
                    className={`capsule ${
                        date === DATE.THIS_MONTH
                            ? 'this-month-capsule'
                            : 'regular-capsule'
                    }`}
                >
                    This Month
                </div>
                <div
                    onClick={onAdd}
                    className={`capsule plus ${
                        date && text.length > 0
                            ? date + '-plus'
                            : 'regular-capsule'
                    }`}
                >
                    +
                </div>
            </div>
        </div>
    );
};

export default InputBar;
