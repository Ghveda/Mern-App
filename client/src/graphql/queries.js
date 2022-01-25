import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      Comment {
        id
        username
        createdAt
        body
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      Comment {
        id
        username
        createdAt
        body
      }
    }
  }
`;
