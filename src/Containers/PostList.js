import axios from "axios";
import React, { useState, useEffect } from "react";
import { Header, Icon, Divider, Item, Message } from "semantic-ui-react";
import Loadingicon from "../Components/Loadingicon"
import MessageLoader from "../Components/MessageLoader";
const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts/");
        console.log(response.data);
        setPosts(response.data);
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
      <Header>PostList</Header>
      <Item.Group>
        <Divider />
        {error && <MessageLoader negative message={error}/>}
        {loading && <Loadingicon />}
        {posts?.map((post) => {
          return (
            <Item key={post.id}>
              <Item.Image size="small" src={post.thumbnail} />

              <Item.Content>
                <Item.Header as="a">{post.title}</Item.Header>
                <Item.Description>{post.content}</Item.Description>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </div>
  );
};
export default PostList;
