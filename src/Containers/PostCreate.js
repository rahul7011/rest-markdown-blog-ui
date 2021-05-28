import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Header, Form, Button } from "semantic-ui-react";
import { history } from "../helpers/history";
import { api } from "../api";
import MessageLoader from "../Components/MessageLoader";
import Loadingicon from "../Components/Loadingicon";
const PostCreate = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef();
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  function handlesubmit(e) {
    setLoading(true);
    e.preventDefault();
    console.log(title);
    console.log(markdown);
    console.log(thumbnail);

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("content", markdown);
    // console.log(formData)
    axios
      .post(api.posts.create, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token 8db098e5de5cd35f7cba9bca44bb680547cb3ad5",
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        history.push("/posts");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message || err);
        setLoading(false);
      });
  }

  return (
    <div>
      <Header>PostCreate</Header>
      {error && <MessageLoader danger message={error} />}
      {thumbnail && (
        <MessageLoader info message={`Selected Image:${thumbnail.name}`} />
      )}
      <Form onSubmit={handlesubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.TextArea
          label="Markdown Content"
          placeholder="Enter Content"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
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
export default PostCreate;
