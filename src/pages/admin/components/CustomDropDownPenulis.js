import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';

import {authorApi} from '../../../api/api.author-api';
const { Option } = Select;

const CustomDropDownPenulis = ({
    origin_author_name,
    updateValue
}) => {
  
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = async (e) => {
    e.preventDefault();
    
    if(name) {
        await upsertAuthor(name);
        updateValue(name);
        setName('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
    }
  };

  const upsertAuthor = async (full_name) => {
    const result = await authorApi.upsertAuthor(full_name);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS') {
        await getAuthorList();
    }
  }

  useEffect(() => {
    getAuthorList();
  }, []);

  const getAuthorList = async () => {
    const result = await authorApi.getAuthorList();
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS') {
        const data = [];
        Array(...result.data).map((e) => {
            data.push(e.full_name);
        });
        setItems(data);
    }
  }

  return (
    <Select
      onChange={(e)=>{
        updateValue(e);
      }}
      style={{
        width: 300,
      }}
      placeholder="Nama Penulis Berita"
      defaultValue={origin_author_name}
      value={origin_author_name}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Masukan nama"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Tambah
            </Button>
          </Space>
        </>
      )}
    >
      {items.map((item, index) => (
        <Option key={item}>{item}</Option>
      ))}
    </Select>
  );
};
export default CustomDropDownPenulis;