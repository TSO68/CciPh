import {observable} from "mobx";
import BleManager from "react-native-ble-manager";
import {delay} from "../utils/index";
import {NativeEventEmitter, NativeModules, PermissionsAndroid, Platform} from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const IS_ANDROID = Platform.OS === "android";
const id = '00:1E:C0:65:D7:ED';
// const id ="F8:FA:BE:D7:96:A2";
const serviceId = 'BE0576CE-6136-5890-BA60-7FA75B1C86A3';
const dataChar = 'dafc2372-b7e6-546b-9309-6d490ca4f60d';

const ackChar = 'b5a7b89e-0d61-5bbc-827c-c4f19abc881c';

class BleStore {

    @observable device = {
        info: null
    };




    async connectToDevice(){
        try {
            await BleManager.start({showAlert: false});
            await delay();
            console.log("BEFORE CONNECT: "+id);
            await BleManager.connect(id);
            console.log('Connect : '+id);
            await delay();
            this.device.info = await BleManager.retrieveServices(id);
            await delay();


            await BleManager.write(id,serviceId,ackChar,[0x01,0x00]);
            await delay();
            console.log("WRITE OK");
            this.device.info = await BleManager.read(id,serviceId,dataChar);
            await delay();

            await BleManager.disconnect(id);


            this.device.info = Object.assign({}, this.device.info);
            const time1 = this.device.info[0] ;
            const time2 = this.device.info[1];
            const res = time1+time2;
            this.device.info[0] = res;

            return this.device.info;
            // timestamp
            // timetamp
            // ph1
            // ph2
            // x
            // y
            // z
            // remainingData


        } catch(error){

            console.log("erreur : "+error);
            await BleManager.disconnect(id);

            //poule
        }
    }


    async requestPermissions(){
        if(!IS_ANDROID) return;

        const resultCheck = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

        if (resultCheck) {
            console.log("Permission is OK");
            return;
        }

        const resultPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

        if (resultPermission) {
            console.log("User accept");
            return;
        }

        throw new Error("User refused Bluetooth Permission");
    }

    async discoverServices(){

    }
}
export default new BleStore();