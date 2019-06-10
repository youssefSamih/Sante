import React, { Component } from 'react';
import _ from 'lodash';
import { Text, TouchableOpacity, View } from 'react-native';
import { CardSection } from '../common';

var PushNotification = require('react-native-push-notification');

var dateApp = ""
var date = new Date().getDate(); 
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var hours = new Date().getHours();
var min = new Date().getMinutes();
var sec = new Date().getSeconds();

class NotificationItem extends Component {
	constructor(props){
        super(props)
        this.state = {
            date: year + '-' + month + '-' + date
        }
	}
	
    render() {
		const { patient } = this.props;
		const appointement = _.map(patient.appointement, (val, uid) => {
            return { ...val, uid };
		});
        appointement.map(item => {
            dateApp = item.date
		})
		dateApp = dateApp.split(" ")
		tim = dateApp[1].split(':')
		if(dateApp[0] === this.state.date){
			PushNotification.configure({
				onNotification: function(notification) {
					console.log( 'NOTIFICATION:', notification );
					
					notification.finish(PushNotificationIOS.FetchResult.NoData);
				},
				popInitialNotification: true,
				requestPermissions: true,
			})
			PushNotification.localNotification({
				foreground: false,
				userInteraction: false,
				message: `Rendez de ce jour avec ${patient.name} a ${tim[0]}:${tim[1]}`,
				largeIcon: "ic_launcher",
				repeatType: 'day',
				bigText: `Rendez vous ce jour avec ${patient.name} a ${tim[0]}:${tim[1]}`,
			})
			return (
				<TouchableOpacity style={styles.touch}>
					<View>
						<CardSection>
							<Text style={styles.titleStyle}>
								{patient.name}
							</Text>
							<Text style={styles.titleStyle}>
								{patient.nCarte}
							</Text>
							<Text style={styles.dateStyle}>
								{tim[0]}:{tim[1]}
							</Text>
						</CardSection>
					</View>
				</TouchableOpacity>
			);
		}else{
			return (
				<View></View>
			)
		}
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15,
    },
    dateStyle: {
		fontSize: 18,
		position: 'absolute',
		right: 15
	},
	nCarteStyle: {
		fontSize: 18,
		position: 'absolute',
		textAlign: 'center',
		paddingLeft: 30,
	},
	touch: {
		paddingTop: 5,
		paddingBottom: 5
	}
};

export default NotificationItem;