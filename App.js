import React from 'react';
import Routes from './src/routes';

//Estilizações para todas páginas... fazer aqui...
import { StatusBar } from 'react-native';

//barStyle="light-content"  (Fica com a status bar branca...)

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes />
    </>
  );
}

