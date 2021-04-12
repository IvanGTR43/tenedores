import React from 'react';
import {LogBox} from "react-native"
import {firebaseApp} from "./app/utils/firebase"
import {decode,encode} from "base-64"
import Navigation from "./app/navigations/Navigation"

LogBox.ignoreLogs(["Setting a timer"])
if (!global.btoa) global.btoa = encode
if(!global.atob) global.atob = decode
export default function App() {

  return (
    <Navigation />
  );
}
