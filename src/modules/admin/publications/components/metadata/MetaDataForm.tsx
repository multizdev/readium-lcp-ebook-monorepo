import React, { ReactElement, useEffect, useState } from 'react';

import { Button, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';

import usePublicationStore from '@admin/publications/store/usePublicationStore';
import usePublication from '@admin/publications/hooks/usePublication';

function MetaDataForm(): ReactElement {
  const { metaDataForm, setMetaDataFormInstance } = usePublicationStore();
  const { getAllPublications } = usePublication();

  const [saving, setSaving] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    setMetaDataFormInstance(form);
  }, [form]);

  return (
    <>
      <span className="font-bold text-xl">Manage MetaData</span>
      <Form
        form={form}
        disabled={metaDataForm === null}
        layout="vertical"
        onFinish={async (values) => {
          setSaving(true);
          const { data } = await axios.post(
            '/api/admin/publications/metadata/save',
            {
              values: {
                ...values,
                content_id: metaDataForm,
              },
            },
          );

          if (data) {
            await getAllPublications();
            setSaving(false);
            form.resetFields();
          }
        }}
      >
        <Form.Item
          className="max-w-[400px]"
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          className="max-w-[400px]"
          label="Authors"
          name="authors"
          rules={[{ required: true, message: 'Please input the authors!' }]}
        >
          <Select mode="tags" placeholder="Authors" />
        </Form.Item>
        <Form.Item
          className="max-w-[400px]"
          label="Categories"
          name="categories"
          rules={[{ required: true, message: 'Please input the categories!' }]}
        >
          <Select mode="tags" placeholder="Categories" />
        </Form.Item>
        <Form.Item
          className="max-w-[400px]"
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber className="w-full" placeholder="Price" min={0} />
        </Form.Item>
        <Form.Item
          className="max-w-[400px]"
          label="Discount"
          name="discount"
          rules={[{ required: true, message: 'Please input the discount!' }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Discount %"
            min={0}
            max={100}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={saving}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default MetaDataForm;
