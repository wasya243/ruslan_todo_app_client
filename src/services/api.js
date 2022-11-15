const BASE_URL = 'http://localhost:3001'

class API {
    _makeRequest(url, options) {
        return fetch(`${BASE_URL}/${url}`, options)
    }

    async fetchTodoList(userId) {
        const res = await this._makeRequest(`api/todos/${userId}`, {method: 'GET'})

        return await res.json()
    }

    addTodo(todo) {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                text: todo.text,
                user_id: todo.user_id,
                due_date: todo.due_date
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return this._makeRequest('api/todos', options)
    }

    completeTodo(id, status) {
        const options = {
            method: 'PATCH',
            body: JSON.stringify({
                is_completed: status
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return this._makeRequest(`api/todos/${id}`, options)
    }

    removeTodo(id) {
        return this._makeRequest(`api/todos/${id}`, {
            method: 'DELETE'
        })
    }
}

export default new API()