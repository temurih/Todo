import React from 'react';
import { Todo, DATE } from '../../App';
import './item.css';
import ArrowDown from './ArrowDown';

export const xIcon = '/icons/x-icon.svg';
const circleIcon = '/icons/circle-icon.svg';

const getLabel = (date: DATE | undefined): string => {
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

interface ItemProps {
    item: Todo;
    handleCompleted: (todo: Todo) => unknown;
    handleDelete: (todo: Todo) => unknown;
}

const Item: React.FC<ItemProps> = ({ item, handleCompleted, handleDelete }) => {
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
                <div
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
