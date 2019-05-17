/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {default as Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import BleManager from "react-native-ble-manager";

type Props = {};
export default class App extends Component<Props> {

    mac_flux = "00:1E:C0:65:D7:ED";
    mac_huawei = "D0:D7:83:35:A0:1C";
    mac_amazfit = "F8:FA:BE:D7:96:A2";

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    device = {
        info: null
    };

    componentDidMount(){
        this.connectToDevice(this.mac_amazfit)
            .then(res => {
            this.result = res;
            console.log(this.result);
            this.setState({
                message: "prout",
            });

        })
            .catch(error=>{
                //let user know that they refused and don't start scan
                Alert.alert("Connection refused");
                console.log(error);
                this.setState({
                    message: "by prouting",
                });
            });
    }

    async connectToDevice(id){
        try {
            BleManager.start({showAlert: false});
            //await BleManager.scan([], 5, true);

            await BleManager.connect(id);

            this.setState({
                message: "GENIAL",
            });
        } catch(error){
            console.log(error);
            this.setState({
                message: "RATE",
            });
        }
    }

    async disconnect(id) {
        try {
            await BleManager.disconnect(id);
            return console.log('Disconnected');
        } catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    componentWillUnmount() {
        this.disconnect(this.mac).then(res => {
            this.result = res;
            console.log(this.result);
        });
    }

    render() {
        return <View>
            <Text>Résultat : {this.state.message} : c'est nul !</Text>
        </View>
    }
}