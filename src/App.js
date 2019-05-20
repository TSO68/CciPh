/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import stores from "./stores";
import {Provider} from "mobx-react";
import React, {Component} from 'react';
import Bluetooth from "./components/smart/Bluetooth";

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider {...stores}>
                <Bluetooth/>
            </Provider>
        );
    }
}