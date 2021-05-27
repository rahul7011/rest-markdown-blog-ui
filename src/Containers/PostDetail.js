import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Header, Image } from "semantic-ui-react";
import axios from "axios";
import Loadingicon from "../Components/Loadingicon";
import MessageLoader from "../Components/MessageLoader";
const PostDetail = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { postSlug } = useParams();
  console.log(postSlug);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/posts/${postSlug}`
        );
        console.log(response.data);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      {loading && <Loadingicon />}
      {error && <MessageLoader negative message={error} />}
      {post && (
        <div>
          <Image src={post.thumbnail}></Image>
          <Header as="h1">{post && post.title}</Header>
          <strong style={{float:"right"}}>
            <small>
              Last Updated:
              {`${new Date(post.last_updated).toLocaleDateString()} ${new Date(post.last_updated).toLocaleTimeString()}`}
            </small>
          </strong>
          <br />
          {post.content}
        </div>
      )}
    </div>
  );
};
export default PostDetail;
