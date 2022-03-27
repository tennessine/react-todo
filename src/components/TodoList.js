import React, {useEffect, useState, useCallback} from 'react'
import {
  Tabs,
  Layout,
  Row,
  Col,
  message
} from 'antd'

import './TodoList.css'

import TodoTab from './TodoTab'
import TodoForm from './TodoForm'

import {
  createTodo,
  deleteTodo,
  updateTodo,
  loadTodos
} from '../services/todo'

const TodoList = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [todos, setTodos] = useState([])
  const [activeTodos, setActiveTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])

  // 处理表单提交
  const handleFormSubmit = (todo) => {
    console.log('create todo', todo)
    setRefreshing(true)
    createTodo(todo)
      .then(() => {
        message.success('添加成功')
        setRefreshing(false)
      })
  }

  // 处理todo删除
  const handleRemoveTodo = (todo) => {
    console.log('delete todo', todo)
    setRefreshing(true)
    deleteTodo(todo.id).then(() => {
      message.warn('删除成功')
      setRefreshing(false)
    })
  }

  // 处理单个todo状态切换
  const handleToggleTodoStatus = (todo) => {
    setRefreshing(true)
    todo.completed = !todo.completed
    updateTodo(todo).then(() => {
      message.info('更新成功')
      setRefreshing(false)
    })
  }

  // 重新加载数据
  const refresh = () => {
    loadTodos().then(json => {
      setTodos(json)
      setActiveTodos(json.filter(todo => !todo.completed))
      setCompletedTodos(json.filter(todo => todo.completed))
    }).then(() => {
      console.log('refresh done')
    })
  }

  // useMemo和useCallback的区别是，useMeno返回值，useCallback返回方法
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    let data = await loadTodos()
    setTodos(data)
    setActiveTodos(data.filter(todo => !todo.completed))
    setCompletedTodos(data.filter(todo => todo.completed))
    setRefreshing(false)
  }, [refreshing])

  // 当onRefresh发生改变的时候执行refresh，也就是当refreshing发生改变的时候
  useEffect(() => {
    refresh()
  }, [onRefresh])

  return (
    <Layout className="layout">
      <Layout.Content style={{padding: '0 50px'}}>
        <div className="todo-list">
          <Row>
            <Col span={16} offset={4}>
              <h1>待办事项</h1>
              <TodoForm onFormSubmit={handleFormSubmit}/>
              <br/>
              <Tabs defaultActiveKey="all">
                <Tabs.TabPane tab="全部" key="all">
                  <TodoTab
                    loading={refreshing}
                    todos={todos}
                    onTodoToggle={handleToggleTodoStatus}
                    onTodoRemove={handleRemoveTodo}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="未完成" key="active">
                  <TodoTab
                    loading={refreshing}
                    todos={activeTodos}
                    onTodoToggle={handleToggleTodoStatus}
                    onTodoRemove={handleRemoveTodo}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="已完成" key="completed">
                  <TodoTab
                    loading={refreshing}
                    todos={completedTodos}
                    onTodoToggle={handleToggleTodoStatus}
                    onTodoRemove={handleRemoveTodo}/>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default TodoList