import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';

import React, { useEffect, useState, useRef } from 'react';


import { tagApi } from '../../../api/api.tag-api';

const { Option } = Select;


const App = ( { setTag, selectedTag}) => {
  console.log(selectedTag);
  useEffect(() => {
    getTagList();
  }, []);

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const handleChange = (value, list) => {
    let data = [];
    Array(...list).map((e) => {
      data.push({ ...e});
    });
    setSelectOptions(data);
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

  const getTagList = async () => {
    const result = await tagApi.getTag();
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS') {
        const data = [];
        Array(...result.data).map((e) => {
            data.push(<Option key={`${e.id}`} value={e.id}>{e.name}</Option>);
        });
        setItems(data);
    }
  }
  
  const [selectOptions, setSelectOptions] = useState(selectedTag || []);

  return(
  <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    placeholder="Tags"
    onChange={handleChange}
    defaultValue = { selectedTag }
    value={ selectOptions }
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
  >
    {items}
  </Select>
)};
export default App;