import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App= ({ Component, pageProps }:AppProps) => {
  return (
    <>
     <ToastContainer />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
};

export default App;
