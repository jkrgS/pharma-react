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

const DataTable = ({
  onFetchTerms,
  terms,
  total_elements,
  columns,
  loading,
  modalOpen,
  onModalOpen,
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
  });

  useEffect(() => {
    onFetchTerms(pagination);
  }, [modalOpen, onFetchTerms, pagination]);

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
          onClick={() => onModalOpen()}
        />
        <Divider className="pageDivider" />
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
      <TransitionsModal />
    </>
  );
};

DataTable.propTypes = {
  onFetchTerms: PropTypes.func,
  terms: PropTypes.array.isRequired,
  total_elements: PropTypes.number,
  columns: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    terms: state.term.terms,
    total_elements: state.term.total_elements,
    columns: state.term.columns,
    loading: state.term.loading,
    modalOpen: state.term.modal?.status?.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTerms: (page = _tables.page) =>
      dispatch(actions.fetchTermData(page)),
    onModalOpen: () => dispatch(actions.modal(true, false, {}, true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
