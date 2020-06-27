import React, { useState, useCallback } from 'react';
import './style.css';
import InputBar from './input/InputBar';
import ListItems from './listItems/ListItems';

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
                />
                <ListItems
                    text="Tomorrow"
                    iconUrl={tomorrowIcon}
                    list={tomorrowTodo}
                    color="#fb5607"
                />
                <ListItems
                    text="This Week"
                    iconUrl={thisWeekIcon}
                    list={thisWeekTodo}
                    color="#ffbe0b"
                />
                <ListItems
                    text="No Date"
                    iconUrl={noDateIcon}
                    list={unknownTodo}
                    color="#9D9FA7"
                />
            </div>
        </div>
    );
};

export default App;
