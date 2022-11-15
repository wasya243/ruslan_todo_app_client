import React from 'react'
import * as moment from 'moment'

import RemoveButton from '../RemoveButton'
import './index.scoped.scss'

const TodoItem = ({todo = {}, onDelete, onComplete, ...props}) => {
    let daysRemaining
    if (!todo.is_completed) {
        daysRemaining = moment(todo.due_date).diff(moment(), 'days')
    }

    return (
        <div
            key={todo._id}
            className={`todo-item ${todo.is_completed ? 'completed' : ''}`}
            onClick={() => onComplete(todo._id, !todo.is_completed)}
            {...props}
        >
            <span>{todo.text} {!todo.is_completed ? <strong>, days remaining: {daysRemaining}</strong> : null}</span>
            <RemoveButton onClick={() => onDelete(todo._id)}/>
        </div>
    )
}

const TodoList = ({
                      todoList = [],
                      onDelete,
                      onComplete
                  }) => {
    return (
        <div className="todo-list">
            {
                todoList.map(todo => {
                    return (
                        <TodoItem
                            todo={todo}
                            onDelete={onDelete}
                            onComplete={onComplete}
                        />
                    )
                })
            }
        </div>
    )
}

export default TodoList