import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import AppointementList from './AppointementList'
import { patientFetch } from '../../actions';


class Apointements extends Component {
  componentWillMount() {
    this.props.patientFetch()
  }

  render(){
      // console.log(this.props.patient)
      return(
          <View style={styles.container}>
              <AppointementList
                patient={this.props.patient}
                navigation={this.props.navigation}
              />
          </View>
      )
  }
}

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

export default connect(mapStateToProps, { patientFetch })(Apointements)