import React, { useState } from 'react';
import './completed.css';
import CompletedItem from './CompletedItem';
import { Todo } from '../App';

interface CompletedProps {
    list: Todo[];
    handleUncompleted: (todo: Todo) => unknown;
    handleDelete: (todo: Todo) => unknown;
}

const Completed: React.FC<CompletedProps> = ({
    list,
    handleUncompleted,
    handleDelete,
}) => {
    const [showList, setShowList] = useState<boolean>(false);
    const handleShow = () => setShowList((s) => !s);
    if (list.length === 0)
        return <div className="completed">No completed tasks</div>;
    return (
        <div className="completed-wrapper">
            <div className="completed pointer" onClick={handleShow}>
                {showList ? 'Hide' : 'Show'} {list.length} completed{' '}
                {list.length === 1 ? 'Task' : 'Tasks'}
            </div>
            {showList &&
                list.map((l) => (
                    <CompletedItem
                        handleUncompleted={handleUncompleted}
                        handleDelete={handleDelete}
                        item={l}
                        key={l.id}
                    />
                ))}
        </div>
    );
};

export default Completed;
