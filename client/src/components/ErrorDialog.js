import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

const ErrorDialog = ({title, text, open, closeDialog}) => {
  return (
     <Dialog
          title={title || ''}
          actions={
            <FlatButton
              label="OK"
              onClick={closeDialog}
            />
          }
          open={open}
        >
          {text}
        </Dialog>
  );
}

export default ErrorDialog;