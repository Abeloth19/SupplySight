import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const errorLink = onError((errorResponse) => {
  const { graphQLErrors, networkError } = errorResponse as {
    graphQLErrors?: { message: string; locations?: unknown; path?: unknown }[];
    networkError?: { message: string; statusCode?: number };
  };
  
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      console.error(
        `GraphQL error: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError.message}`);
    
    if ('statusCode' in networkError && networkError.statusCode === 500) {
      console.error('Server error - please check backend');
    }
    
    if (networkError.message.includes('fetch')) {
      console.error('Network connectivity issue - server may be offline');
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ['id'],
      },
      Warehouse: {
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});