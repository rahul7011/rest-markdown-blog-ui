import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Header, Image } from "semantic-ui-react";
import axios from "axios";
import Loadingicon from "../Components/Loadingicon";
import MessageLoader from "../Components/MessageLoader";
import {api} from "../api";
import useFetch from "../helpers/hooks";
const PostDetail = () => {
  const { postSlug } = useParams();
  const {data,loading,error} = useFetch(api.posts.retrieve(postSlug))
  return (
    <div>
      {loading && <Loadingicon />}
      {error && <MessageLoader negative message={error} />}
      {data && (
        <div>
          <Image src={data.thumbnail}></Image>
          <Header as="h1">{data && data.title}</Header>
          <strong style={{float:"right"}}>
            <small>
              Last Updated:
              {`${new Date(data.last_updated).toLocaleDateString()} ${new Date(data.last_updated).toLocaleTimeString()}`}
            </small>
          </strong>
          <br />
          {data.content}
        </div>
      )}
    </div>
  );
};
export default PostDetail;
