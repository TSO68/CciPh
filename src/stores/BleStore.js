import {observable} from "mobx";
import BleManager from "react-native-ble-manager";
import {delay} from "../utils/index";
import {NativeEventEmitter, NativeModules, PermissionsAndroid, Platform} from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const IS_ANDROID = Platform.OS === "android";
const id = '00:1E:C0:65:D7:ED';

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
            await this.discoverServices();
            await delay();
            await BleManager.disconnect(id);
            return this.device.info;
        } catch(error){

            console.log("erreur : "+error);
            await BleManager.disconnect(id);
            throw new Error(error);
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
        this.device.info = await BleManager.retrieveServices(id);
    }
}
export default new BleStore();