import React from 'react';
import {
  useState,
} from 'react'
import axios from 'axios'
import './index.css'
import { Button, Form, Input, Select, Card, Col, Row, Statistic, notification, Space, Typography, Divider } from 'antd';

const App = () => {

  const [getResponseData, setGetResponseData] = useState();
  const [toShow, SetToShow] = useState(false)
  const [state, setState] = useState({
    province: '',
    radio: ''
  });
  const { Text, Link, Title } = Typography;


  const handleSubmit = async (event) => {

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

  const select_city = getResponseData
    ? getResponseData.content.map(item => ({
      value: item.name,
      label: item.name
    }))
    : [{ value: 'disabled', label: 'Disabled', disabled: true }]

  const [form] = Form.useForm();
  const nameValue = Form.useWatch('province', form);

  const onChange = (value) => {
    console.log(value)
    const getObjectByName = (name) => {
      return getResponseData.content.find(item => item.name === name);
    };
    const obj = getObjectByName(value.name)
    console.log(obj)
    const province = value
      ? value.name
      : ''
    const radio = value
      ? obj.value
      : ''
    setState({
      province,
      radio
    });
    SetToShow(true)
  };
  const onFinishFailed = () => {
    openNotification()
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Finish Failed',
      description:
        'Please fill with the form .',
      duration: 3,
    });
  };

  return (
    <div>
      <Row gutter={1} type="flex" justify='center' align="middle"
        style={{ minHeight: '73vh' }}>
        <Col span={4}></Col>
        <Col span={10} className='NeoCard'>
          <Card style={{ display: 'flex', justifyContent: 'center' }}>
            <Title type="flex" justify='center' align="middle">RayDar</Title>
            <Form form={form} layout="vertical"
              style={{
                maxWidth: 150,
              }} autoComplete="off"
              onFinish={onChange}
              onFinishFailed={onFinishFailed}>
              <Form.Item
                name="province"
                label="Province"
                rules={[{ required: true, message: 'Please input province name!' }]}>
                <Input onBlur={handleSubmit} />
              </Form.Item>
              {contextHolder}

              <Form.Item name="name" label="Zone">
                <Select
                  // defaultValue="lucy"
                  showSearch
                  placeholder="Select a District"
                  optionFilterProp="children"
                  // onChange={onChangeCity}
                  options={select_city}
                />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit" value="large">
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
          {
            toShow
              ? <Card bordered={true}>
                <Statistic
                  title={state.province}
                  value={state.radio}
                  precision={2}
                  valueStyle={{
                    color: 'black',
                  }}
                // suffix="%"
                />
              </Card>
              : <div></div>
          }

        </Col>
        <Col span={4}></Col>
      </Row>
      <Row gutter={1} type="flex" justify='center' align="middle"
      >
        <Space>
          <Typography>
            <Divider>Made by</Divider>
            <Text type="secondary">Xinshui</Text>
            <Text type="secondary">&nbsp;|&nbsp;Inspired by </Text>
            <Link href="https://sspai.com/post/82619" target="_blank">
              Fairyex
            </Link>
          </Typography>
        </Space>
      </Row>
    </div >
  )
}
export default App
