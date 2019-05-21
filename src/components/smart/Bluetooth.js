import {observer} from "mobx-react";
import React, {Component} from "react";
import {Button} from "react-native";
import {Text, View} from "react-native";
import {inject} from "mobx-react";

@inject('bleStore') @observer
export default class Bluetooth extends Component{
    constructor(props){
        super(props);

    }

    render(){
        const {bleStore} = this.props;

        return(
            <View>

                {
                    bleStore.device.info != null
                        ?
                        <View>
                            <Text>TimeStamp :{bleStore.device.info[0]}</Text>
                            <Text>Ph 1 :{bleStore.device.info[2]}</Text>
                            <Text>Ph 2 :{bleStore.device.info[3]}</Text>
                            <Text>x :{bleStore.device.info[4]}</Text>
                            <Text>y :{bleStore.device.info[5]}</Text>
                            <Text>z :{bleStore.device.info[6]}</Text>
                            <Text>remainingData :{bleStore.device.info[7]}</Text>
                        </View>
                        :
                        <Text>{JSON.stringify(bleStore.device.info, null, 2)}</Text>

                }


                <Button onPress={()=>this.linkToDevice()} title='poulet'
                />
            </View>
        )
    }

    componentDidMount(): void {





    }


    async linkToDevice(){
        const {bleStore} = this.props;

        await bleStore.requestPermissions();
        console.log("request PERMISSION = > OK ");

        await bleStore.connectToDevice();
        console.log("CONNECTE TO DEVICE = > OK ");



    }
}