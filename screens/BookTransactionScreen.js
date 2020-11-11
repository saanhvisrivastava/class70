import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async () =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: 'clicked',
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
           
          
           <Image
            
            source={require("../assets/booklogo.jpg")}
            style={{width:200,height:200}}
           
           />
           <Text style={{fontSize:50,textAlign:'center'}}> Wily</Text>
           

           <View style={styles.inputView}>

            <TextInput placeholder='book id'
            style={styles.inputBox}
            >
              
             
            </TextInput>

            <TouchableOpacity style={styles.scanButton}>
              <Text>Scan </Text>
            </TouchableOpacity>

           </View>
         
           <View style={styles.inputView}>
            <TextInput placeholder='student id'
            style={styles.inputBox}
            >
              
             
            </TextInput>

            <TouchableOpacity style={styles.scanButton}>
              <Text>Scan </Text>
            </TouchableOpacity>

           </View>
         
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      
      borderWidth:2,
      width:60
    },
    buttonText:{
      fontSize: 20,
    },
    inputView:{
      flexDirection:"row",
      margin:20,
      
    },
    inputBox:{
      width:200,
      height:40,
      borderWidth:1.5,
      fontSize:20
    }
  });