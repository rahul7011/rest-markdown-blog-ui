import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Header, Icon, Divider, Item, Message } from "semantic-ui-react";
import { api } from "../api";
import Loadingicon from "../Components/Loadingicon";
import MessageLoader from "../Components/MessageLoader";
import useFetch from "../helpers/hooks";
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
              <Item.Image size="small" src={post.thumbnail} />

              <Item.Content>
                <NavLink to={`/posts/${post.slug}`}>
                  <Item.Header as="h3">{post.title}</Item.Header>
                </NavLink>
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
