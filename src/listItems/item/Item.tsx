import React from 'react';
import { Todo, STATUS, DATE } from '../../App';
import './item.css';

export const xIcon = '/icons/x-icon.svg';
const circleIcon = '/icons/circle-icon.svg';
const arrowDownIcon = '/icons/arrow-down-icon.svg';

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

interface ItemProps {
    item: Todo;
    handleStatusChange: (todo: Todo, newStatus: STATUS) => unknown;
}

const Item: React.FC<ItemProps> = ({ item, handleStatusChange }) => {
    const handleCompleted = () => {
        handleStatusChange(item, STATUS.COMPLETED);
    };
    return (
        <div className="item-wrapper">
            <div className="item-content" onClick={handleCompleted}>
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
                    <img
                        className="arrow-down"
                        src={arrowDownIcon}
                        title="arrow-down"
                        alt="arrow-down"
                    />
                </div>
                <img src={xIcon} title="delete" alt="delete" />
            </div>
        </div>
    );
};

export default Item;
