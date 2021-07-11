import { _tables } from '../../models/interfaces/ITables';
import { _term, _terms } from '../../models/interfaces/ITerms';
import {
  getTerms,
  createTerm as createTermService,
  editTerm as editTermService,
  deleteTerm as deleteTermService,
} from '../../services/terms';
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

export const createTermSuccess = (term = _term) => {
  const { _v, _id, ...termData } = term;
  console.log({ termData });
  return {
    type: actionTypes.CREATE_TERM_SUCCESS,
    createTerm: termData,
  };
};

export const createTermFail = (error) => {
  return {
    type: actionTypes.CREATE_TERM_FAIL,
    error,
  };
};

export const editTermSuccess = (term = _term) => {
  return {
    type: actionTypes.EDIT_TERM_SUCCESS,
    editTerm: term,
  };
};

export const editTermFail = (error) => {
  return {
    type: actionTypes.EDIT_TERM_FAIL,
    error,
  };
};

export const deleteTermSuccess = (term = _term) => {
  return {
    type: actionTypes.DELETE_TERM_SUCCESS,
    deleteTerm: term,
  };
};

export const deleteTermFail = (error) => {
  return {
    type: actionTypes.DELETE_TERM_FAIL,
    error,
  };
};

export const fetchTermDataStart = () => {
  return { type: actionTypes.TERM_DATA_FETCH };
};

export const modal = (status, onDelete, term = _term, onAddNew = false) => {
  return { type: actionTypes.MODAL_STATUS, status, onDelete, term, onAddNew };
};

export const fetchTermData = (page = _tables.page) => {
  return (dispatch) => {
    dispatch(fetchTermDataStart());

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
        render: (term) => (
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
              onClick={() => dispatch(modal(true, false, term))}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ backgroundColor: '#B2204F', borderColor: '#B2204F' }}
              onClick={() => dispatch(modal(true, true, term))}
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

export const createTerm = (term = _term) => {
  return (dispatch) => {
    createTermService(term)
      .then(({ data }) => {
        dispatch(createTermSuccess(data.term));
        dispatch(fetchTermData({ current: 1, size: 10 }));
      })
      .catch((e) => dispatch(createTermFail(e)));
  };
};

export const editTerm = (term = _term) => {
  return (dispatch) => {
    editTermService(term)
      .then(({ data }) => dispatch(editTermSuccess(data.term)))
      .catch((e) => dispatch(editTermFail(e)));
  };
};

export const deleteTerm = (term = _term) => {
  return (dispatch) => {
    deleteTermService(term)
      .then(({ data }) => dispatch(deleteTermSuccess(data.term)))
      .catch((e) => dispatch(deleteTermFail(e)));
  };
};
