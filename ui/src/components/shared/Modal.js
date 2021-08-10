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
  onCreateTerm,
  onEditTerm,
  onDeleteTerm,
  modalDeleteAction,
  modalAddNewAction,
}) => {
  const [form, setForm] = useState({});
  const { EditTermFields, CreateTermFields } = forms;

  const handleFieldChange = (event) => {
    const id = !event?.target ? 'has_children' : event?.target?.id;
    const value = !event?.target ? event?.switch : event?.target?.value;

    if (id) {
      const newValue =
        id === 'obo_id' ? { [id]: value, key: value } : { [id]: value };
      const newForm = { ...form, ...newValue };

      setForm({ ...newForm });
    }
  };

  const handleCreate = () => {
    onCreateTerm(form);
    onModalClose(false);
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
      setForm(
        !modalAddNewAction
          ? {
              key: modalTerm?.key,
              label: modalTerm?.label,
              synonyms: modalTerm?.synonyms,
              term_editor: modalTerm?.term_editor,
              has_children: modalTerm?.has_children,
            }
          : {
              has_children: false,
              key: '',
              label: '',
              obo_id: '',
              synonyms: '',
              term_editor: '',
            }
      ),
    [modalAddNewAction, modalTerm]
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
        {!modalDeleteAction && !modalAddNewAction && (
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
        {modalAddNewAction && (
          <>
            <DialogTitle id="form-dialog-title">Add New Term</DialogTitle>
            <DialogContent>
              <CreateTermFields onChange={(e) => handleFieldChange(e)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleCreate} color="primary">
                Create
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
    modalAddNewAction: state.term.modal?.onAddNew,
    modalDeleteAction: state.term.modal?.onDelete,
    modalTerm: state.term.modal?.term,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onModalClose: (status) => dispatch(actions.modal(status, null, null)),
    onCreateTerm: (term) => dispatch(actions.createTerm(term)),
    onEditTerm: (term) => dispatch(actions.editTerm(term)),
    onDeleteTerm: (term) => dispatch(actions.deleteTerm(term)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
