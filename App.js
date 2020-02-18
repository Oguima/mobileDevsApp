import React from 'react';
import Routes from './src/routes';

//Estilizações para todas páginas... fazer aqui...
import { StatusBar, YellowBox } from 'react-native';

//barStyle="light-content"  (Fica com a status bar branca...)

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes />
    </>
  );
}

