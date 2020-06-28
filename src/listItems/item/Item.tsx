import React from 'react';
import { Todo, STATUS } from '../../App';
import './item.css';

const circleIcon = '/icons/circle-icon.svg';
export const xIcon = '/icons/x-icon.svg';
export const arrowDownIcon = '/icons/arrow-down-icon.svg';

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
                    {item.date || 'No Date'}
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
