import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "semantic-ui-react";
import axios from "axios";
import Loadingicon from "../Components/Loadingicon";
import MessageLoader from "../Components/MessageLoader";
const PostDetail = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const {postSlug} = useParams();
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
      <Header>{post && post.title}</Header>
      {error && <MessageLoader negative message={error} />}
      {loading && <Loadingicon />}
      {post && (
          <p>
              {post.content}
          </p>
      )}
    </div>
  );
};
export default PostDetail;
