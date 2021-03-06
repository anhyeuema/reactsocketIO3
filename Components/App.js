import { View, Text, TouchableOpacity, TextInput, ListView } from 'react-native';
import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

var e;
var mang = [
    { t1: 'test thu1', t2: '1111' },
    { t1: 'thest thu 2', t2: '2222' },
    { t1: 'thest thu 3', t2: '33333' },

];

export default class App extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('http://192.168.0.104:3000', { jsonp: false });
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(mang),
            maunen: '#517299',
            text: 'red',
            id: '1',
        };
        this.socket.on('server-send-color', function (data) {
            e.setState({ 
                id: data,
                maunen: data,
                text: data,
                dataSource: ds.cloneWithRows(data),
            });
            console.log(data);
        });
    }

    clickME() {
        var { text, id } = this.state;
        this.socket.emit('client-send-color', ({ text, id }));
    }

    taoHang(property) {
        return (
            <View style={{ flex: 1, }} key={property.id}>
                <Text key={property.id} >{property.t1}</Text>  
                <Text>{property.text}</Text>
            </View>
        );
    }
    

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

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.taoHang}
                />

{/* 
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.taoHang}
                />

*/}

            </View>
        );
    }
}