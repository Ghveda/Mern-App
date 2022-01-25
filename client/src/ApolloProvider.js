import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  headers: authLink,
  cache: new InMemoryCache(),
});
export default client;
