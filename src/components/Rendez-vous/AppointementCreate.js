import React, { Component } from 'react';
import { ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { appointementUpdate, appointementCreate } from '../../actions'
import { Card, CardSection, Button } from '../common';
import AppointementForm from './AppointementForm';

class AppointementCreate extends Component {
    onButtonPress() {
        const { uid, date } = this.props;
        var navigate = this.props.navigation
        this.props.appointementCreate({ uid, date, navigate });
    }

    render(){
        return(
            <ScrollView>
                <Card>
                    <AppointementForm {...this.props} />
                    <CardSection>
                        
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Ajouter
                        </Button>
                    </CardSection>
                </Card>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
	const { uid, date } = state.AppointementForm;

	return { uid, date };
};

export default connect(mapStateToProps, {appointementUpdate, appointementCreate})(AppointementCreate);