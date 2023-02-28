import React, { useState, useContext } from 'react';
import { Button, Box, Typography, Grid, IconButton, } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './style.module.scss';

import { addLike, getLike, removeLike } from '../../../shared/apis/likeAPI';
import { getAllComments, addComment } from '../../../shared/apis/commentAPI';
import { getUserName } from '../../../shared/apis/userAPI';
import GlobalContext from "../../../shared/contexts/GlobalContext";

export default function Item({ open, setOpen, item, optionFields, tags }) {
  const [isLiked, setIsLiked] = useState(false);
  const { client } = useContext(GlobalContext);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

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
      getItemLike();
      //getAllItemComments();
    }
  }, [open]);

  const getItemLike = async () => {
    const like = await getLike({ user: client.id, item: item.id });
    if (like) {
      setIsLiked(true);
    }
    else {
      setIsLiked(false);
    }
  }

  const setLike = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      await addLike({ user: client.id, item: item.id });
    }
    else {
      await removeLike({ user: client.id, item: item.id });
    }
  }

  const getAllItemComments = async () => {
    // finish back for getUserName
    const comments = await getAllComments(item.id);
    comments.forEach(async (comment, index) =>{
      const userName = await getUserName(comment.user);
      comments[index].user = userName;
    })
    setComments(comments);
  }

  const sentComment = async () => {
    setComment('');
    const commentData = await addComment({user: client.id, item: item.id, text: comment })
  }

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
          <Box className={styles.comments}>
            Comments:
            {comments.map( (comment) => {
              return (
                <Box>
                  <p>{comment.text}</p>
                </Box>
              )
            })
            }
            <Box className={styles.textarea}>
              <textarea value={comment} onChange={(event)=>{setComment(event.target.value)}}/>
            </Box>
            <Button onClick={sentComment} size='small' id={styles.tableButton}>Sent</Button>
          </Box>
          <DialogActions id={styles.dialogActions} >
            <IconButton onClick={setLike} id={isLiked ? (styles.likeTrue) : (styles.likeFalse)} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </Box>
  );
}