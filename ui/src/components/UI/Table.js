import '../../App.scss';
// import logo from '../../logo.svg';
import { getTerms } from '../../services/terms';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Table, Switch, Tooltip } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Name',
    dataIndex: 'label',
  },
  {
    title: 'Synonyms',
    dataIndex: 'synonyms',
  },
  {
    title: 'Code',
    dataIndex: 'obo_id',
  },
  {
    title: 'Editor',
    dataIndex: 'term_editor',
  },
  {
    title: 'Children',
    dataIndex: 'has_children',
    render: (has_children) => (
      <Tooltip
        title={
          has_children ? 'The term has children' : 'The term has not children'
        }
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={has_children}
          disabled
        />
      </Tooltip>
    ),
  },
];

const DataTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [page] = useState(1);

  useEffect(() => {
    getTerms(page)
      .then(({ data }) => {
        setDataSource(
          data._embedded.terms.map((term) => {
            return {
              key: term.obo_id,
              label: term.label,
              synonyms: term.synonyms ? term.synonyms.join(', ') : '-',
              obo_id: term.obo_id,
              term_editor: term.annotation['term editor']
                ? term.annotation['term editor'].join(', ')
                : '-',
              has_children: term.has_children,
            };
          })
        );
      })
      .catch((e) => console.log(e));
  }, [page]);

  return (
    <div className="App">
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={!dataSource.length}
      />
    </div>
  );
};

export default DataTable;
