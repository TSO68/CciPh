import React, {Component} from "react";
import {Text} from "react-native";
import {inject} from "mobx-react";

import {delay} from "../../utils/index";


@inject('bleStore')
export default class Bluetooth extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {bleStore} = this.props;

        return(
            <Text>{JSON.stringify(bleStore.device.info, null, 2)}</Text>
        )
    }

    componentDidMount(): void {
        this.linkToDevice();
    }


    async linkToDevice(){
        const {bleStore} = this.props;

        await bleStore.requestPermissions();
        console.log("request PERMISSION = > OK ");

        await bleStore.connectToDevice();
        console.log("CONNECTE TO DEVICE = > OK ");
    }
}