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
    THIS_MONTH = 'this-month',
}

export const options = [DATE.TODAY, DATE.TOMORROW, DATE.THIS_WEEK, undefined];

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
    const [thisMonthTodo, setThisMonthTodo] = useState<Todo[]>([]);
    const [unknownTodo, setUnknownTodo] = useState<Todo[]>([]);
    const [completed, setCompleted] = useState<Todo[]>([]);

    const handleAddTodo = useCallback(
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
                case DATE.THIS_MONTH:
                    setThisMonthTodo((thisMonthTodo) => [...thisMonthTodo, todo]);
                    break;
                default:
                    setUnknownTodo((unknownTodo) => [...unknownTodo, todo]);
                    break;
            }
        },
        // eslint-disable-next-line
        [setTodayTodo, setTomorrowTodo, setThisWeekTodo, setThisMonthTodo, setUnknownTodo],
    );

    const handleUncompleted = useCallback(
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
                    setThisWeekTodo((thisWeekTodo) => [...thisWeekTodo, todo]);
                    return;
                case DATE.THIS_MONTH:
                    setThisMonthTodo((thisMonthTodo) => [...thisMonthTodo, todo]);
                    return;

                default:
                    setUnknownTodo((t) => [...unknownTodo, todo]);
                    break;
            }
        },
        // eslint-disable-next-line
        [completed],
    );

    const handleDelete = (todo: Todo) => {
        let index = -1;
        if (todo.status === STATUS.COMPLETED) {
            index = completed.findIndex((c) => c.id === todo.id);
            if (index === -1) return;
            completed.splice(index, 1);
            setCompleted([...completed]);
            return;
        }
        switch (todo.date) {
            case DATE.TODAY:
                index = todayTodo.findIndex((t) => t.id === todo.id);
                if (index === -1) return;
                todayTodo.splice(index, 1);
                setTodayTodo([...todayTodo]);
                return;
            case DATE.TOMORROW:
                index = tomorrowTodo.findIndex((t) => t.id === todo.id);
                if (index === -1) return;
                tomorrowTodo.splice(index, 1);
                setTomorrowTodo([...tomorrowTodo]);
                return;
            case DATE.THIS_WEEK:
                index = thisWeekTodo.findIndex((t) => t.id === todo.id);
                if (index === -1) return;
                thisWeekTodo.splice(index, 1);
                setThisWeekTodo([...thisWeekTodo]);
                return;

            case DATE.THIS_MONTH:
                index = thisMonthTodo.findIndex((t) => t.id === todo.id);
                if (index === -1) return;
                thisMonthTodo.splice(index, 1);
                setThisMonthTodo([...thisMonthTodo]);
                return;

            default:
                index = unknownTodo.findIndex((t) => t.id === todo.id);
                if (index === -1) return;
                unknownTodo.splice(index, 1);
                setUnknownTodo([...unknownTodo]);
                return;
        }
    };

    const handleCompleted = useCallback(
        (todo: Todo) => {
            todo.status = STATUS.COMPLETED;
            let index = -1;
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
                case DATE.THIS_MONTH:
                    index = thisMonthTodo.findIndex((t) => t.id === todo.id);
                    if (index === -1) return;
                    thisMonthTodo.splice(index, 1);
                    setThisMonthTodo([...thisMonthTodo]);
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

    const handleDateChange = (todo: Todo, newDate: DATE | undefined) => {
        if (todo.date === newDate) return;
        const currentDate = todo.date;
        todo.date = newDate;
        let index = -1;
        switch (currentDate) {
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
            case DATE.THIS_MONTH:
                index = thisMonthTodo.findIndex((t) => t.id === todo.id);
                if (index === -1) return;
                thisMonthTodo.splice(index, 1);
                setThisMonthTodo([...thisMonthTodo]);
                break;

            default:
                index = unknownTodo.findIndex((t) => t.id === todo.id);
                if (index === -1) return;
                unknownTodo.splice(index, 1);
                setUnknownTodo([...unknownTodo]);
                break;
        }
        handleAddTodo(todo);
    };

    return (
        <div className="content">
            <img src={logo} title="logo" alt="logo" />
            <InputBar handleAdd={handleAddTodo} />
            <div className="list-wrapper">
                <ListItems
                    text="Today"
                    iconUrl={todayIcon}
                    list={todayTodo}
                    color="#ff006e"
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleDateChange={handleDateChange}
                />
                <ListItems
                    text="Tomorrow"
                    iconUrl={tomorrowIcon}
                    list={tomorrowTodo}
                    color="#fb5607"
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleDateChange={handleDateChange}
                />
                <ListItems
                    text="This Week"
                    iconUrl={thisWeekIcon}
                    list={thisWeekTodo}
                    color="#ffbe0b"
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleDateChange={handleDateChange}
                />
                <ListItems
                    text="This Month"
                    iconUrl={thisWeekIcon} // no month icon present
                    list={thisMonthTodo}
                    color="#40E0D0"
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleDateChange={handleDateChange}
                />
                <ListItems
                    text="No Date"
                    iconUrl={noDateIcon}
                    list={unknownTodo}
                    color="#9D9FA7"
                    handleCompleted={handleCompleted}
                    handleDelete={handleDelete}
                    handleDateChange={handleDateChange}
                />
            </div>
            <Completed
                handleUncompleted={handleUncompleted}
                handleDelete={handleDelete}
                list={completed}
            />
        </div>
    );
};

export default App;
