import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogContentText } from "@mui/material";

function SimpleDialog(props) {
  const { onClose, open, marksObtained, marks } = props;

  const handleClose = (event, reason) => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>
        Congratulations! Your test is submitted Successfully
      </DialogTitle>
      <DialogContent>
        <DialogContentText className='flex flex-col'>
          <span>
            Your Marks: {marksObtained} / {marks}.{" "}
          </span>
          <span className='font-bold'>
            Percentage Obtained: {(marksObtained / marks).toFixed(2) * 100} %
          </span>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  marksObtained: PropTypes.number.isRequired,
  marks: PropTypes.number.isRequired,
};

export default function QuizResultsDialog({ open, marks, marksObtained }) {
  const [isOpen, setIsOpen] = React.useState(open);

  const handleClose = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <div>
      <SimpleDialog
        open={isOpen}
        onClose={handleClose}
        marks={marks}
        marksObtained={marksObtained}
      />
    </div>
  );
}
