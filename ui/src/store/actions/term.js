import { _tables } from '../../models/interfaces/ITables';
import { _term, _terms } from '../../models/interfaces/ITerms';
import { getTerms } from '../../services/terms';
import * as actionTypes from './actionTypes';
import { Switch, Tooltip, Button } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

export const termDataSuccess = (terms = _terms, total = 0, columns) => {
  return {
    type: actionTypes.TERM_DATA_SUCCESS,
    termsData: terms,
    total_elements: total,
    columns,
  };
};

export const termDataFail = (error) => {
  return {
    type: actionTypes.TERM_DATA_FAIL,
    error,
  };
};

export const fetchTermDataStart = () => {
  return { type: actionTypes.TERM_DATA_FETCH };
};

export const modal = (status, action, data = _term) => {
  return { type: actionTypes.MODAL_STATUS, status, action, data };
};

export const fetchTermData = (page = _tables.page) => {
  return (dispatch) => {
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
              has_children
                ? 'The term has children'
                : 'The term has not children'
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
      {
        title: '',
        render: (data = _term) => (
          <div style={{ display: 'flex' }}>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              style={{
                backgroundColor: '#05CAA6',
                borderColor: '#05CAA6',
                marginRight: '9px',
              }}
              onClick={() => dispatch(modal(true, 'Edit', data))}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ backgroundColor: '#B2204F', borderColor: '#B2204F' }}
              onClick={() => dispatch(modal(true, 'Delete', data))}
            />
          </div>
        ),
      },
    ];

    getTerms(page.current, page.size)
      .then(({ data }) => {
        const { terms, count } = data;
        dispatch(termDataSuccess(terms, count, columns));
      })
      .catch((e) => dispatch(termDataFail(e)));
  };
};
