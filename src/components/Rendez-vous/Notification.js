import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import NotificationList from './NotificationList'
import { patientFetch } from '../../actions';


class Notification extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.props.patientFetch()
    }

    render(){
        return(
            <View style={styles.container}>
                <NotificationList
                  patient={this.props.patient}
                  navigation={this.props.navigation}
                />
            </View>
        )
    }
}

// export default Notification
const mapStateToProps = state => {
    const patient = _.map(state.patient, (val, uid) => {
    return { ...val, uid };
    });
  
    return { patient };
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  });
  
  export default connect(mapStateToProps, { patientFetch })(Notification)