import React, { useState, useRef } from "react";
import { Redirect, useParams } from "react-router";
import Loadingicon from "../Components/Loadingicon";
import useFetch from "../helpers/hooks";
import { Header, Form, Button, Divider, Image } from "semantic-ui-react";
import { history } from "../helpers/history";
import { api } from "../api";
import MessageLoader from "../Components/MessageLoader";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import axios from "axios";
import authAxios from "../Services/AuthenticationServices";

const PostUpdateForm = ({
  postSlug,
  initialTitle,
  initialContent,
  initialtThumbnail,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef();
  const [title, setTitle] = useState(initialTitle);
  const [markdown, setMarkdown] = useState(initialContent);
  const [CurrentThumbnail, setCurrentThumbnail] = useState(initialtThumbnail);
  const [thumbnail, setThumbnail] = useState("");

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  function handlesubmit(e) {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    if (thumbnail) {
      //we are checking if thumbnail is not null,if not null then update with the new one.
      formData.append("thumbnail", thumbnail);
    }
    formData.append("title", title);
    formData.append("content", markdown);

    authAxios
      .put(api.posts.update(postSlug), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        history.push("/posts");
      })
      .catch((err) => {
        setError(err.message || err);
        setLoading(false);
      });
  }

  return (
    <div>
      <Header>PostUpdate</Header>
      {error && <MessageLoader negative message={error} />}
      {thumbnail && (
        <MessageLoader info message={`Selected Image:${thumbnail.name}`} />
      )}
      {CurrentThumbnail && <Image src={CurrentThumbnail} size="small" />}
      <Divider />
      <Form onSubmit={handlesubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <MdEditor
          value={markdown}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setMarkdown(text)}
        />

        <Form.Field>
          <Button
            type="button"
            content="Choose a thumbnail"
            labelPosition="right"
            icon="file"
            color="black"
            onClick={() => fileInputRef.current.click()}
          ></Button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            hidden
          />
        </Form.Field>
        <Button fluid type="submit" color="blue" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

const PostUpdate = () => {
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));

  if (data && data.is_author === false) {
    return <Redirect to="/" />;
  }
  else
  return (
    <>
      {loading && <Loadingicon />}
      {error && <MessageLoader negative message={error} />}
      {data && (
        <PostUpdateForm
          postSlug={postSlug}
          initialTitle={data.title}
          initialContent={data.content}
          initialtThumbnail={data.thumbnail}
        />
      )}
    </>
  );
};

export default PostUpdate;
