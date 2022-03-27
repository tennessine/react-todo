import React from 'react'
import {
  List
} from 'antd'

import TodoItem from './TodoItem'

const TodoTab = ({todos, onTodoRemove, onTodoToggle, loading}) => {
  return (
    <List
      loading={loading}
      locale={{
        emptyText: '没有什么需要做的'
      }}
      dataSource={todos}
      renderItem={(todo) => (
        <TodoItem todo={todo}
                  onTodoRemove={onTodoRemove}
                  onTodoToggle={onTodoToggle}/>
      )}
      pagination={{
        position: 'bottom',
        pageSize: 10
      }}>
    </List>
  )
}

export default TodoTab