import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { patientFetch } from '../actions';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CardSection, Card } from '../components/common';


class Dashboard extends Component {
    componentWillMount() {
        this.props.patientFetch()
    }

    render() {
      var countAppointement = 0
      hasAppointement = false
      this.props.patient.map(item => {
        const appointement = _.map(item.appointement, (val, uid) => {
          return { ...val, uid };
        });
        if(appointement.length > 0){
          hasAppointement = true
        }else{
          hasAppointement = false
        }
        if(hasAppointement){
          countAppointement++
        }
      })
      return (
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card style={styles.cardStyle}>
              <CardSection>
                <Text style={styles.titleTotal}>Total Patient</Text>
              </CardSection>
              <View>
                <Text>{this.props.patient.length}</Text>
              </View>
            </Card>
            <CardSection>
            </CardSection>
            <Card style={styles.cardStyle}>
              <CardSection>
                <Text style={styles.titleTotal}>Total Appointment</Text>
              </CardSection>
              <CardSection>
                <Text>{countAppointement}</Text>
              </CardSection>
            </Card>
          </View>
        </ScrollView>
      );
    }
  }

const styles = StyleSheet.create({
  cardStyle:{
    padding: 85,
    margin: 30,
    borderStyle : 'dotted',
    borderWidth : 1,
    borderColor : '#007aff'
  },
  titleTotal:{
    fontWeight: 'bold',
    fontSize: 20,
  }
})

const mapStateToProps = state => {
    const patient = _.map(state.patient, (val, uid) => {
		return { ...val, uid };
    });

	return { patient };
}

export default connect(mapStateToProps, { patientFetch })(Dashboard)