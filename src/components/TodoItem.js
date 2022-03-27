import React, {useState} from 'react'
import {
  Tooltip,
  Tag,
  List,
  Button,
  Popconfirm,
  Switch
} from 'antd'

import {
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'

const TodoItem = ({todo, onTodoRemove, onTodoToggle}) => (
  <List.Item actions={[
    <Tooltip title={todo.completed ? '改为未完成' : '改为已完成'}>
      <Switch
        checkedChildren={<CheckOutlined/>}
        unCheckedChildren={<CloseOutlined/>}
        onChange={() => onTodoToggle(todo)}
        defaultChecked={todo.completed}
      />
    </Tooltip>,
    <Popconfirm
      title="确定要删除吗？"
      onConfirm={() => onTodoRemove(todo)}>
      <Button className="todo-remove-button" type="primary" danger>X</Button>
    </Popconfirm>
  ]}
             key={todo.id}>
    <div className="todo-item">
      <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">{todo.title}</Tag>
    </div>
  </List.Item>
)

export default TodoItem