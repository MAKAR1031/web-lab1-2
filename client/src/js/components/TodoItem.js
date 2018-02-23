import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changePriority} from '../actions/todo_actions';

class TodoItem extends Component {
    handleChange = () => this.props.changePriority(this.props.todo.id);

    isPriority = () => this.props.todo.priority;

    render() {
        return (
            <li className={"list-group-item mb-2 " + (this.isPriority() ? 'priority-task' : '')}>
                <div className='container'>
                    <div className="row">
                        <div className="col-11">
                            <h4 className={this.isPriority() ? 'priority-task' : ''}>
                                {this.props.todo.text}
                            </h4>
                        </div>
                        <div className="col-1">
                            <button className='btn btn-info' onClick={this.handleChange}>Priority</button>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {changePriority},
    dispatch
);

export default connect(null, mapDispatchToProps)(TodoItem);
