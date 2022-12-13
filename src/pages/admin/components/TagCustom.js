import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import React, { useEffect, useState, useRef } from 'react';

import { tagApi } from '../../../api/api.tag-api';

const { Option } = Select;


const App = ( { setTag, selectedTag}) => {
  useEffect(() => {
    getTagList();
  }, []);

  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const handleChange = (value, list) => {
    let data = [];
    Array(...list).map((e) => {
      data.push({ ...e, key: e.value});
    });
    setTag(data);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = async (e) => {
    e.preventDefault();
    
    if(name) {
        await upsertTag(name);
        // updateValue(name);
        setName('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
    }
  };

  const upsertTag = async (name) => {
    const result = await tagApi.upsertTag(name);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS') {
        await getTagList();
    }
  }

  
  const [items, setItems] = useState([]);
  const getTagList = async () => {
    const result = await tagApi.getTag();
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS') {
        const data = [];
        Array(...result.data).map((e) => {
          data.push({
            key: e.id,
            value: e.id,
            label: e.name
          });
        });
        setItems(data);
    }
  }

  return(
  <Select
  key={String(new Date())}
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="Tags"
    onChange={handleChange}
    value={ selectedTag }
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
            placeholder="Masukan tag baru"
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
    options={items}
  >
  </Select>
)};
export default App;