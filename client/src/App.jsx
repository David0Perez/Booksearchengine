import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from './@apollo/client';
import { setContext} from './@apollo/client/link/context';
import { Outlet } from 'react-router-dom';


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
