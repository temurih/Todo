import React from 'react';
import { Todo, STATUS } from '../App';
import './listItem.css';
import Item from './item/Item';

interface ListItemsProps {
    text: string;
    iconUrl: string;
    list: Todo[];
    color: string;
    handleStatusChange: (todo: Todo, newStatus: STATUS) => unknown;
}

const ListItems: React.FC<ListItemsProps> = ({
    text,
    iconUrl,
    list,
    color,
    handleStatusChange,
}) => {
    const style = {
        color,
    };
    return (
        <div className="list-container">
            <div className="list">
                <div className="top">
                    <img src={iconUrl} title={text} alt={text} />
                    <div className="text" style={style}>
                        {text}
                    </div>
                </div>
                <div className="sub-text">
                    {list.length} {list.length === 1 ? 'todo' : 'todos'}
                </div>
            </div>
            {list.length > 0 && (
                <div className="item">
                    {list.map((l) => {
                        if (l.status === STATUS.PENDING)
                            return (
                                <Item
                                    key={l.id}
                                    item={l}
                                    handleStatusChange={handleStatusChange}
                                />
                            );
                        return null;
                    })}
                </div>
            )}
        </div>
    );
};

export default ListItems;
