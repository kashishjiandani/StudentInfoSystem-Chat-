import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App'; // Import your main application component
import './index.css'; // Import your CSS file
import { ChakraProvider } from '@chakra-ui/react';
import {store} from './app/store'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider>
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  </ChakraProvider>
);
