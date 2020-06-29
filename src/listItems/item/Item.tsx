import React from 'react';
import { Todo, DATE } from '../../App';
import './item.css';
import DatePicker from './DatePicker';

export const xIcon = '/icons/x-icon.svg';
const circleIcon = '/icons/circle-icon.svg';

interface ItemProps {
    item: Todo;
    handleCompleted: (todo: Todo) => unknown;
    handleDelete: (todo: Todo) => unknown;
    handleDateChange: (todo: Todo, newDate: DATE | undefined) => unknown;
}

const Item: React.FC<ItemProps> = ({
    item,
    handleCompleted,
    handleDelete,
    handleDateChange,
}) => {
    const handleStatusCompleted = () => {
        handleCompleted(item);
    };
    const handleStatusDeleted = () => {
        handleDelete(item);
    };

    return (
        <div className="item-wrapper">
            <div className="item-content" onClick={handleStatusCompleted}>
                <img src={circleIcon} title="item" alt="item" />
                <div className="item-text">{item.text}</div>
            </div>
            <div className="item-actions">
                <DatePicker item={item} handleDateChange={handleDateChange} />
                <img
                    src={xIcon}
                    title="delete"
                    alt="delete"
                    className="delete-icon"
                    onClick={handleStatusDeleted}
                />
            </div>
        </div>
    );
};

export default Item;
