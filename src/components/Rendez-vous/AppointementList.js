import React, { Component } from 'react'
import _ from 'lodash';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native'
import AppointementItem from './AppointementItem'

class AppointementList extends Component {
    constructor(props){
        super(props)
        this.state = {
            patient: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ patient: nextProps.patient })
    }

    _editPatientDetail = (patient) => {
        this.props.navigation.navigate('PatientEdit', {patient: patient})
    }

    _isAppointement(item){
        const appointement = _.map(item.appointement, (val, uid) => {
            return { ...val, uid };
        });
        if(appointement != '' || appointement.length > 0){
            return(
                <AppointementItem 
                    patient={item}
                />
            )
        }
    }

    _loadListPatient(){
        if(this.state.patient && this.state.patient.length > 0 ){
            return (
                <FlatList
                    style={styles.list}
                    data={this.state.patient}
                    extraData={this.state.patient}
                    keyExtractor={(item) => item.uid.toString()}
                    renderItem={({item}) => (
                        this._isAppointement(item)
                    )}
                    onEndReachedThreshold={0.5}
                />
            )
        }
        else{
            return (
                <View style={styles.loading_container}>
                  <ActivityIndicator size='large' />
                </View>
            )
        }
    }
    
    render() {
        return (
            this._loadListPatient()
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        position: 'relative'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
})

export default AppointementList