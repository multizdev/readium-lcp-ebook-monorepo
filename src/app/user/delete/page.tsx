'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

function AccountDeletionRequest() {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values: any) => {
    setLoading(true);
    console.log('Form Submitted:', values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Account deletion request submitted successfully!');
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm" style={{ width: 400 }}>
        <Title level={2}>Request Account Deletion</Title>
        <Paragraph>
          Please fill out the form below to request the deletion of your
          account.
        </Paragraph>
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          className="grid gap-4"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input type="email" placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <Input.TextArea placeholder="Write your message here" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AccountDeletionRequest;
