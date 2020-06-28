import React, { useState, useCallback } from 'react';
import './style.css';
import InputBar from './input/InputBar';
import ListItems from './listItems/ListItems';
import Completed from './completed/Completed';

const logo = '/logo.svg';
const todayIcon = '/icons/today-icon.svg';
const tomorrowIcon = '/icons/tomorrow-icon.svg';
const thisWeekIcon = '/icons/this-week-icon.svg';
const noDateIcon = '/icons/no-date-icon.svg';

export enum STATUS {
    PENDING,
    COMPLETED,
    DELETED,
}

export enum DATE {
    TODAY = 'today',
    TOMORROW = 'tomorrow',
    THIS_WEEK = 'this-week',
}

export interface Todo {
    id: number;
    text: string;
    date: DATE | undefined;
    status: STATUS;
}

const App = () => {
    const [todayTodo, setTodayTodo] = useState<Todo[]>([]);
    const [tomorrowTodo, setTomorrowTodo] = useState<Todo[]>([]);
    const [thisWeekTodo, setThisWeekTodo] = useState<Todo[]>([]);
    const [unknownTodo, setUnknownTodo] = useState<Todo[]>([]);
    const [completed, setCompleted] = useState<Todo[]>([]);

    const handleTodo = useCallback(
        (todo: Todo) => {
            switch (todo.date) {
                case DATE.TODAY:
                    setTodayTodo((todayTodo) => [...todayTodo, todo]);
                    break;
                case DATE.TOMORROW:
                    setTomorrowTodo((tomorrowTodo) => [...tomorrowTodo, todo]);
                    break;
                case DATE.THIS_WEEK:
                    setThisWeekTodo((thisWeekTodo) => [...thisWeekTodo, todo]);
                    break;
                default:
                    setUnknownTodo((unknownTodo) => [...unknownTodo, todo]);
                    break;
            }
        },
        // eslint-disable-next-line
        [setTodayTodo, setTomorrowTodo, setThisWeekTodo, setUnknownTodo],
    );

    const handleUncomplete = useCallback(
        (todo: Todo) => {
            const index = completed.findIndex((c) => c.id === todo.id);
            completed.splice(index, 1);
            setCompleted([...completed]);
            todo.status = STATUS.PENDING;
            switch (todo.date) {
                case DATE.TODAY:
                    setTodayTodo((t) => [...todayTodo, todo]);
                    return;
                case DATE.TOMORROW:
                    setTomorrowTodo((t) => [...tomorrowTodo, todo]);
                    return;
                case DATE.THIS_WEEK:
                    setThisWeekTodo((t) => [...thisWeekTodo, todo]);
                    return;

                default:
                    setUnknownTodo((t) => [...unknownTodo, todo]);
                    break;
            }
        },
        // eslint-disable-next-line
        [completed],
    );

    const handleStatusChange = useCallback(
        (todo: Todo, newStatus: STATUS) => {
            let index = -1;
            todo.status = STATUS.COMPLETED;
            switch (todo.date) {
                case DATE.TODAY:
                    index = todayTodo.findIndex((t) => t.id === todo.id);
                    if (index === -1) return;
                    todayTodo.splice(index, 1);
                    setTodayTodo([...todayTodo]);
                    break;
                case DATE.TOMORROW:
                    index = tomorrowTodo.findIndex((t) => t.id === todo.id);
                    if (index === -1) return;
                    tomorrowTodo.splice(index, 1);
                    setTomorrowTodo([...tomorrowTodo]);
                    break;
                case DATE.THIS_WEEK:
                    index = thisWeekTodo.findIndex((t) => t.id === todo.id);
                    if (index === -1) return;
                    thisWeekTodo.splice(index, 1);
                    setThisWeekTodo([...thisWeekTodo]);
                    break;

                default:
                    index = unknownTodo.findIndex((t) => t.id === todo.id);
                    if (index === -1) return;
                    unknownTodo.splice(index, 1);
                    setUnknownTodo([...unknownTodo]);
                    break;
            }
            setCompleted((c) => [...c, todo]);
        },
        // eslint-disable-next-line
        [todayTodo, tomorrowTodo, unknownTodo],
    );

    return (
        <div className="content">
            <img src={logo} title="logo" alt="logo" />
            <InputBar handleAdd={handleTodo} />
            <div className="list-wrapper">
                <ListItems
                    text="Today"
                    iconUrl={todayIcon}
                    list={todayTodo}
                    color="#ff006e"
                    handleStatusChange={handleStatusChange}
                />
                <ListItems
                    text="Tomorrow"
                    iconUrl={tomorrowIcon}
                    list={tomorrowTodo}
                    color="#fb5607"
                    handleStatusChange={handleStatusChange}
                />
                <ListItems
                    text="This Week"
                    iconUrl={thisWeekIcon}
                    list={thisWeekTodo}
                    color="#ffbe0b"
                    handleStatusChange={handleStatusChange}
                />
                <ListItems
                    text="No Date"
                    iconUrl={noDateIcon}
                    list={unknownTodo}
                    color="#9D9FA7"
                    handleStatusChange={handleStatusChange}
                />
            </div>
            <Completed handleUncomplete={handleUncomplete} list={completed} />
        </div>
    );
};

export default App;
