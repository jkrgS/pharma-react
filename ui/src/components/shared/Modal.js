import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { forms } from '../../shared/forms';

const FormDialog = ({
  modalStatus,
  onModalClose,
  modalTerm,
  onEditTerm,
  onDeleteTerm,
  modalDeleteAction,
}) => {
  const [form, setForm] = useState({
    key: '',
    label: '',
    synonyms: '',
    term_editor: '',
  });
  const { EditTermFields } = forms;

  const handleFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    const newForm = { ...form, [id]: value };

    setForm({ ...newForm });
  };

  const handleEdit = () => {
    onEditTerm(form);
    onModalClose(false);
  };

  const handleDelete = () => {
    onDeleteTerm(form);
    onModalClose(false);
  };

  const handleClose = () => {
    onModalClose(false);
  };

  useEffect(
    () =>
      setForm({
        key: modalTerm?.key,
        label: modalTerm?.label,
        synonyms: modalTerm?.synonyms,
        term_editor: modalTerm?.term_editor,
      }),
    [modalTerm]
  );

  return (
    <div>
      <Dialog
        open={modalStatus || false}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {modalDeleteAction && (
          <>
            <DialogTitle id="form-dialog-title">
              Delete Term, are you sure?
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
        {!modalDeleteAction && (
          <>
            <DialogTitle id="form-dialog-title">Edit Term</DialogTitle>
            <DialogContent>
              <EditTermFields
                term={form}
                onChange={(e) => handleFieldChange(e)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleEdit} color="primary">
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modalStatus: state.term.modal?.status,
    modalDeleteAction: state.term.modal?.onDelete,
    modalTerm: state.term.modal?.term,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onModalClose: (status) => dispatch(actions.modal(status, null, null)),
    onEditTerm: (term) => dispatch(actions.editTerm(term)),
    onDeleteTerm: (term) => dispatch(actions.deleteTerm(term)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
