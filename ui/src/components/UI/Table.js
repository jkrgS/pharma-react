import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Pagination } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { _tables } from '../../models/interfaces/ITables';
import BarChart from '../../components/UI/BarChart';
import { Divider, Button } from 'antd';
import PropTypes from 'prop-types';
import TransitionsModal from '../shared/Modal';
import { AppstoreAddOutlined } from '@ant-design/icons';

const DataTable = ({ onFetchTerms, terms }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
  });

  useEffect(() => {
    onFetchTerms(pagination);
  }, [onFetchTerms, pagination]);

  return (
    <>
      <div className="App">
        <Button
          type="primary"
          shape="round"
          size="middle"
          icon={
            <AppstoreAddOutlined
              style={{
                display: 'flex',
                alignSelf: 'center',
                alignContent: 'center',
              }}
            />
          }
          style={{
            backgroundColor: '#13A169',
            borderColor: '#13A169',
            display: 'flex',
            marginBottom: '15px',
            justifyContent: 'center',
            width: '113px',
          }}
        />
        <Divider className="pageDivider" />
        <Table
          columns={terms.columns}
          dataSource={[...terms.terms]}
          loading={terms.loading}
          pagination={false}
        />
        <Pagination
          className="tablePaginator"
          current={pagination.current}
          total={terms.total_elements || 0}
          disabled={terms.loading}
          onChange={(page, pageSize) =>
            setPagination({ current: page, size: pageSize })
          }
        />
        <Divider className="pageDivider" />
        <BarChart title="Word label frequency" />
      </div>
      <TransitionsModal termsUpdated={() => onFetchTerms(pagination)} />
    </>
  );
};

DataTable.propTypes = {
  onFetchTerms: PropTypes.func,
  terms: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    terms: state.term,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTerms: (page = _tables.page) =>
      dispatch(actions.fetchTermData(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
