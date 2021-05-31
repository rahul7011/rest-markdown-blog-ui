import React from "react";
import { NavLink } from "react-router-dom";
import { Header, Divider, Item } from "semantic-ui-react";
import { api } from "../api";
import Loadingicon from "../Components/Loadingicon";
import MessageLoader from "../Components/MessageLoader";
import useFetch from "../helpers/hooks";
import ReactMarkdown from "react-markdown";
import Truncate from "react-truncate";
const PostList = () => {
  const { data, loading, error } = useFetch(api.posts.list);
  return (
    <div>
      <Header>PostList</Header>
      <Item.Group>
        <Divider />
        {error && <MessageLoader negative message={error} />}
        {loading && <Loadingicon />}
        {data?.map((post) => {
          return (
            <Item key={post.id}>
                <Item.Image size="small" src={post.thumbnail} className="img"/>
              <Item.Content>
                <NavLink to={`/posts/${post.slug}`}>
                  <Item.Header as="h3">{post.title}</Item.Header>
                </NavLink>
                <Truncate
                  lines={3}
                  ellipsis={
                    <span>
                      ... <a href={`/posts/${post.slug}`}>Read more</a>
                    </span>
                  }
                >
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </Truncate>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </div>
  );
};
export default PostList;
