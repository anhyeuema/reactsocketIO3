import { View, Text, TouchableOpacity, TextInput, ListView } from 'react-native';
import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

var e;

export default class App extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('http://192.168.0.105:3000' , { jsonp: false });
     //   var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
       //     dataSource: ds.cloneWithRows(''),
            maunen: '#517299',
            text: 'red',
        };
        this.socket.on('server-send-color', function (data) {
            e.setState({ 
                maunen: data,
                text: data,
         //       dataSource: ds.cloneWithRows(data),
            });
            console.log(data);
        });
    }

    clickME() {
        this.socket.emit('client-send-color', this.state.text);
    }


    /*
    taoHang(property) {
        return (
            <View style={{ flex: 1, }}>
                <Text>{property.text}</Text>  
            </View>
        );
    }
    */

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.state.maunen }} >
           
                <TextInput
                    placeholder=".."
                    value={this.state.text}
                    onChangeText={text => this.setState({ text: text })}
                />

                <TouchableOpacity 
                    style={{ padding: 10, borderWidth: 1, borderColor: '#E61A5F' }}
                    onPress={() => this.clickME()}
                >
                        <Text>Doi mau </Text>
                </TouchableOpacity>


{/* 
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.taohang}
                />

*/}

            </View>
        );
    }
}