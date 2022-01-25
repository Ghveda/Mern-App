import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import MyPopup from "../util/MyPopup";

import { useMutation } from "@apollo/client";
import {
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
} from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update() {
      setConfirmOpen(false);
      if (callback) {
        callback();
      }
    },
    refetchQueries: [GET_POSTS, "getPosts"],
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
};

export default DeleteButton;
