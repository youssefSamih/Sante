import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CardSection } from '../common';

class NotificationItem extends Component {
    render() {
		const { name } = this.props.patient;
		return (
			<TouchableOpacity style={styles.touch}>
				<View>
		        	<CardSection>
		        		<Text style={styles.titleStyle}>
		            		{name}
		        		</Text>
                        <Text style={styles.titleStyle}>
		            		{name}
		        		</Text>
					</CardSection>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15,
    },
    dateStyle: {
		fontSize: 18,
        paddingRight: 15,
        textAlign: 'right'
	},
	touch: {
		paddingTop: 5,
		paddingBottom: 5
	}
};

export default NotificationItem;