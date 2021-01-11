import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Pagination } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { _tables } from '../../models/interfaces/ITables';
import BarChart from '../../components/UI/BarChart';
import { Divider } from 'antd';
import PropTypes from 'prop-types';

const DataTable = ({
  onFetchTerms,
  terms,
  total_elements,
  columns,
  loading,
}) => {
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
  columns: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    terms: state.term.terms,
    total_elements: state.term.total_elements,
    columns: state.term.columns,
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
