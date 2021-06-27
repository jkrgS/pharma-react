import React, { useEffect, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { forms } from '../../shared/forms';
import { updateTerm } from '../../services/terms';

const TransitionsModal = ({ modalOpen, modal, onModalClose, termsUpdated }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    key: '',
    label: '',
    synonyms: '',
    term_editor: '',
    has_children: false,
  });
  const { EditTermFields } = forms;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    onModalClose(false);
  }, [onModalClose]);

  const handleFieldChange = (event) => {
    let newValue = {};
    const { target } = event;
    const id = target ? target.id : 'has_children';
    const value = target ? target.value : event;

    newValue[id] = value;
    setForm({ ...form, ...newValue });
  };

  const handleUpdateTerm = () => {
    updateTerm(form);
    handleClose();
    termsUpdated();
  };

  useEffect(() => {
    modalOpen ? handleOpen() : handleClose();
    if (modalOpen) {
      setForm({ ...modal?.data });
    }
  }, [modalOpen, handleClose, modal?.data]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{}</DialogTitle>
        <DialogContent>
          {modalOpen && (
            <EditTermFields
              onChange={(e) => handleFieldChange(e)}
              term={form}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateTerm}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.term.modal?.status,
    modal: state.term?.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onModalClose: (status) => dispatch(actions.modal(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransitionsModal);
