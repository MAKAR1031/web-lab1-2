import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import TodoList from '../components/TodoList';
import TodoInput from '../components/TodoInput';
import TodoCounter from '../components/TodoCounter';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className='container'>
                        <div>
                            <h3 className='text-muted mb-3'>Todo list</h3>
                        </div>
                        <TodoCounter/>
                        <div>
                            <Route exact path="/" component={TodoList}/>
                            <Route path="/add" component={TodoInput}/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
