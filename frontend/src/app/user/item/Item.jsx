import * as React from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Item({ open, setOpen, item, optionFields, tags }) {

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Grid container direction="column">
          <DialogTitle id="scroll-dialog-title">{item.name}</DialogTitle>
          <DialogContent >
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Box>
                <Typography >{item.item_id}</Typography>

                {optionFields.map((field) => (
                  <Typography >{field.name} : {field.value}</Typography>
                ))}
                <Typography marginTop={1} >Tags:</Typography>
                {tags.map((tag) => (
                  <Typography >{tag.name} </Typography>
                ))}

              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </Box>
  );
}