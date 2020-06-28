import React from 'react';
import { Todo } from '../App';
import { xIcon } from '../listItems/item/Item';

const completedIcon = '/icons/completed-icon.svg';

interface CompletedItemProps {
    item: Todo;
    handleUncomplete: (todo: Todo) => unknown;
}

const CompletedItem: React.FC<CompletedItemProps> = ({
    item,
    handleUncomplete,
}) => {
    const handleMarkAsUncomplete = () => handleUncomplete(item);
    return (
        <div className="completed-item item-wrapper">
            <div className="item-content">
                <img src={completedIcon} title="item" alt="item" />
                <div className="item-text">{item.text}</div>
            </div>
            <div className="item-actions">
                <div
                    className="item-select today-item-select"
                    onClick={handleMarkAsUncomplete}
                >
                    Mark as uncomplete
                </div>
                <img src={xIcon} title="delete" alt="delete" />
            </div>
        </div>
    );
};

export default CompletedItem;
