import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import PostsCard from "../components/PostsCard";
import { GET_POSTS } from "../graphql/queries";
import { Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_POSTS);

  return (
    <>
      <Grid columns={3} divided>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {data &&
                data.getPosts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostsCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Home;
