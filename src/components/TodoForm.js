import React from 'react'
import {
  Form,
  Row,
  Col,
  Button,
  Input
} from 'antd'

import {PlusCircleFilled} from '@ant-design/icons'

const TodoForm = ({onFormSubmit}) => {
  const [form] = Form.useForm()
  const onFinish = () => {
    onFormSubmit({
      title: form.getFieldValue('title'),
      completed: false
    })
    form.resetFields()
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form">

      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item name="title" rules={[{required: true, message: '待办事项名称必须填写'}]}>
            <Input placeholder="你要做什么？" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit">
            <PlusCircleFilled/>
            添加
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TodoForm