import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext} from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { navbar }) => {
  const token = localStorage.getItem('id_token');
  return {
    navbar: {
      ...navbar,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
