import React from 'react';
import {
  useState,
} from 'react'
import axios from 'axios'
import './index.css'
import { Button, Form, Input } from 'antd';

const App = () => {
  // const [formData, setData] = useState({
  //   key1: ''
  // })
  const [getResponseData, setGetResponseData] = useState();

  // const handleChange = (event) => {
  //     const { name, value } = event.target
  //     setData({
  //       ...formData,
  //       [name]: nameValue,
  //     })
  //   }

  const handleSubmit = async (event) => {
    // event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/endpoint',
        {
          key1: nameValue
        });
      console.log('Data sent successfully:', response.data)
      // 发送get请求
      const getResponse = await axios.get('http://127.0.0.1:5000/api/endpoint');
      console.log('Get response:', getResponse.data);
      // 在这里展示get请求结果
      setGetResponseData(getResponse.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const province = getResponseData
    ? getResponseData.area
    : ''
  const radio = getResponseData
    ? getResponseData.content[0].value
    : ''

  const [form] = Form.useForm();
  const nameValue = Form.useWatch('province', form);
  // console.log(nameValue)

  return (
    <div>
      {/* <div class="card">
        <form
          class="card__form"
          onSubmit={handleSubmit}>
          <input name="key1"
            value={formData.key1}
            onChange={handleChange}
            type="text"
            placeholder="province" />
          <input
            type='text'
          />
          <br />
          <Button type="submit">Primary Button</Button>
          <button class="sign-up" type="submit">Sub<span style={{ "color": "yellow" }}>mit</span></button>
        </form>
      </div> */}
      {
        getResponseData
          ? <p>
            {province}地区的辐射值为：{radio}
          </p>
          : ''
      }
      <Form form={form} layout="vertical" autoComplete="off" onFinish={handleSubmit}>
        <Form.Item name="province" label="province">
          <Input />
        </Form.Item>
        {/* <Form.Item name="age" label="Age (Not Watch)">
          <InputNumber />
        </Form.Item> */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div >
  )
}
export default App
