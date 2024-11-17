import React, { ReactElement, useEffect, useState } from 'react';

import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import axios from 'axios';

import usePublicationStore from '@admin/publications/store/usePublicationStore';
import usePublication from '@admin/publications/hooks/usePublication';

function MetaDataForm(): ReactElement {
  const {
    metaDataForm,
    metaDataFormId,
    setMetaDataForm,
    setMetaDataFormId,
    setMetaDataFormInstance,
  } = usePublicationStore();
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
          try {
            if (metaDataForm) {
              // Determine the API endpoint based on whether metaDataForm (content ID) exists
              const url =
                metaDataForm && metaDataFormId
                  ? '/api/admin/publications/metadata/update' // Update if content ID exists
                  : '/api/admin/publications/metadata/save'; // Save if no content ID

              const { data } = await axios.post(url, {
                values: {
                  ...values,
                  content_id: metaDataForm, // Pass content ID for update or save
                },
                id: metaDataFormId,
              });

              if (data) {
                await getAllPublications();
                setSaving(false);
                form.resetFields();
                setMetaDataForm(null);
                setMetaDataFormId(null);
              }
            } else {
              message.error('Cannot update');
              setMetaDataForm(null);
              setMetaDataFormId(null);
            }
          } catch (error) {
            message.error('There was a problem');
            setSaving(false);
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
          label="Publisher"
          name="publisher"
          rules={[{ required: true, message: 'Please input the publisher!' }]}
        >
          <Input placeholder="Publisher" />
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
          label="Publication Place"
          name="publication_place"
          rules={[
            { required: true, message: 'Please input the publication place!' },
          ]}
        >
          <Input placeholder="Publication Place" />
        </Form.Item>
        <Form.Item
          className="max-w-[400px]"
          label="What's it about?"
          name="what_its_about"
          rules={[
            { required: true, message: 'Please input what it is about!' },
          ]}
        >
          <Input placeholder="What's it about?" />
        </Form.Item>
        <Form.Item
          className="max-w-[400px]"
          label="Who is it for?"
          name="who_it_for"
          rules={[{ required: true, message: 'Please input who it is for!' }]}
        >
          <Input placeholder="Who is it for?" />
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
            {metaDataForm ? 'Update' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default MetaDataForm;
