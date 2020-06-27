import React from 'react';
import { Todo } from '../App';
import './listItem.css';

interface ListItemsProps {
    text: string;
    iconUrl: string;
    list: Todo[];
    color: string;
}

const ListItems: React.FC<ListItemsProps> = ({
    text,
    iconUrl,
    list,
    color,
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
                    {list.map((l) => (
                        <div key={l.id}>{l.text}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListItems;
