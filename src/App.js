import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import * as moment from 'moment'

import './App.scss'

import Search from './components/Search'
import TodoList from './components/TodoList'
import AddButton from './components/AddButton'
import DateSelector from './components/DateSelector'
import api from './services/api'

const USER_KEY = 'user'

function App() {
    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const [todoText, setTodoText] = useState('')
    const [dueDate, setDueDate] = useState('')

    const fetchTodoList = async () => {
        try {
            setIsLoading(true)
            const data = await api.fetchTodoList(user.user_id)
            setTodoList(data)
            setIsLoading(false)
        } catch (err) {
            console.error(err)
            setIsLoading(false)
        }
    }

    const initUser = () => {
        const user = JSON.parse(localStorage.getItem(USER_KEY))
        if (!user) {
            const userToAdd = {
                user_id: uuidv4()
            }

            localStorage.setItem(USER_KEY, JSON.stringify(userToAdd))
        } else {
            setUser(user)
        }
    }

    const addTodo = async () => {
        try {
            await api.addTodo({
                text: todoText,
                user_id: user.user_id,
                due_date: dueDate
            })

            setTodoText('')
            setDueDate('')
            fetchTodoList()
        } catch (err) {
            console.error(err)
        }
    }

    const handleComplete = async (id, is_completed) => {
        try {
            await api.completeTodo(id, is_completed)
            fetchTodoList()
        } catch (err) {
            console.error(err)
        }
    }

    const removeTodo = async (id) => {
        try {
            await api.removeTodo(id)
            fetchTodoList()
        } catch (err) {
            console.error(err)
        }
    }

    const handleTodoTextChange = (text) => {
        setTodoText(text)
    }

    const handleDueDateChange = (dueDate) => {
        setDueDate(dueDate)
    }

    useEffect(() => {
        initUser()
    }, [])

    useEffect(() => {
        if (user.user_id) {
            fetchTodoList()
        }
    }, [user])

    return (
        <div className="container">
            <div className="search-container">
                <Search
                    onChange={handleTodoTextChange}
                    placeholder="type todo"
                    value={todoText}
                />

                <DateSelector
                    value={dueDate}
                    minValue={moment().format('yyyy-MM-DD')}
                    onChange={handleDueDateChange}
                />

                <AddButton
                    onAdd={addTodo}
                    disabled={!todoText || !dueDate}
                />
            </div>

            <TodoList
                todoList={todoList}
                onComplete={handleComplete}
                onDelete={removeTodo}
            />
        </div>
    );
}

export default App
