import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Switch, Tooltip, Pagination } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { _tables } from '../../models/interfaces/ITables';
import BarChart from '../../components/UI/BarChart';
import { Divider } from 'antd';
import PropTypes from 'prop-types';

// set the columns of the table
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
    // set a switcher \disabled/
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

const DataTable = ({ onFetchTerms, terms, total_elements, loading }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
  });

  useEffect(() => {
    onFetchTerms(pagination);
  }, [onFetchTerms, pagination]);

  return (
    <div className="App">
      <Table
        columns={columns}
        dataSource={terms}
        loading={loading}
        pagination={false}
      />
      <Pagination
        className="tablePaginator"
        current={pagination.current}
        total={total_elements || 0}
        disabled={loading}
        onChange={(page, pageSize) =>
          setPagination({ current: page, size: pageSize })
        }
      />
      <Divider className="pageDivider" />
      <BarChart title="Word label frequency" />
    </div>
  );
};

DataTable.propTypes = {
  onFetchTerms: PropTypes.func,
  terms: PropTypes.array.isRequired,
  total_elements: PropTypes.number,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    terms: state.term.terms,
    total_elements: state.term.total_elements,
    loading: state.term.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTerms: (page = _tables.page) =>
      dispatch(actions.fetchTermData(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
