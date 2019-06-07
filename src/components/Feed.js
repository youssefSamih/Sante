import React, { Component } from 'react'
import { View, Button } from 'react-native'

class Feed extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Go To Detail Screen" onPress={() => this.props.navigation.navigate('Detail')} />
        </View>
        );
    }
}

export default Feed