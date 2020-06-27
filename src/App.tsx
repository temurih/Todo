import React, { useState } from 'react';
import './style.css';

enum DATE {
    TODAY,
    TOMORROW,
    THIS_WEEK,
}

interface ToDo {
    id: number;
    text: string;
    date: DATE;
}

const App = () => {
    const [todo, setTodo] = useState<ToDo[]>([]);
    return <div className="App"></div>;
};

export default App;
