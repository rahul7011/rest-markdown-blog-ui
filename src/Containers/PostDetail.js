import React,{useState} from "react";
import { useParams } from "react-router";
import { Button, Divider, Header, Image, Modal } from "semantic-ui-react";
import Loadingicon from "../Components/Loadingicon";
import MessageLoader from "../Components/MessageLoader";
import { api } from "../api";
import axios from "axios";
import {history} from "../helpers/history";
import useFetch from "../helpers/hooks";
import ReactMarkdown from 'react-markdown'

function DeleteModal({ title, thumbnail,postSlug}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlesubmit() {
    setLoading(true);

    axios
      .delete(api.posts.delete(postSlug),{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token 8db098e5de5cd35f7cba9bca44bb680547cb3ad5",
        },
      })
      .then((res) => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err.message || err);
        setLoading(false);
      });
  }



  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button secondary floated="right">
          Delete
        </Button>
      }
    >
      <Modal.Header>Are you sure you want to delete it?</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={thumbnail} wrapped />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <MessageLoader negative message={error} />}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yes,Delete"
          labelPosition="right"
          icon="checkmark"
          loading={loading}
          onClick={handlesubmit}
          negative
        />
      </Modal.Actions>
    </Modal>
  );
}

const PostDetail = () => {
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));
  return (
    <div>
      {loading && <Loadingicon />}
      {error && <MessageLoader negative message={error} />}
      {data && (
        <div>
          <Image src={data.thumbnail}></Image>
          <Header as="h1">{data && data.title}</Header>
          <strong style={{ float: "right" }}>
            <small>
              Last Updated:
              {`${new Date(data.last_updated).toLocaleDateString()} ${new Date(
                data.last_updated
              ).toLocaleTimeString()}`}
            </small>
          </strong>
          <br />
          <ReactMarkdown>
          {data.content}
          </ReactMarkdown>
          <Divider />
          <DeleteModal
            title={data.title}
            thumbnail={data.thumbnail}
            postSlug={postSlug}
          ></DeleteModal>
        </div>
      )}
    </div>
  );
};
export default PostDetail;
