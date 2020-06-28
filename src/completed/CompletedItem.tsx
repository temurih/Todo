import React from 'react';
import { Todo } from '../App';
import { xIcon } from '../listItems/item/Item';

const completedIcon = '/icons/completed-icon.svg';

interface CompletedItemProps {
    item: Todo;
    handleUncompleted: (todo: Todo) => unknown;
    handleDelete: (todo: Todo) => unknown;
}

const CompletedItem: React.FC<CompletedItemProps> = ({
    item,
    handleUncompleted,
    handleDelete,
}) => {
    const handleMarkAsUncompleted = () => handleUncompleted(item);
    const handleStatusDeleted = () => handleDelete(item);
    return (
        <div className="completed-item item-wrapper">
            <div className="item-content">
                <img src={completedIcon} title="item" alt="item" />
                <div className="item-text">{item.text}</div>
            </div>
            <div className="item-actions">
                <div
                    className="item-select today-item-select"
                    onClick={handleMarkAsUncompleted}
                >
                    Mark as uncompleted
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

export default CompletedItem;
