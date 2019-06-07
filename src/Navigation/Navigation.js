import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Fon from 'react-native-vector-icons/FontAwesome';
import Mat from 'react-native-vector-icons/MaterialIcons';
import Ant from 'react-native-vector-icons/AntDesign';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import Login from '../components/LoginForm'
import Feed from '../components/Feed'
import Settings from '../components/Settings'
import Profile from '../components/Profile'
import Detail from '../components/Detail'
import Patients from '../components/Patients/Patient'
import PatientAction from '../components/Patients/PatientAction'
import PatientFavorite from '../components/Patients/PatientFavorite'
import PatientCreate from '../components/Patients/PatientCreate'
import PatientEdit from '../components/Patients/PatientEdit'


import Apoitements from '../components/Rendez-vous/Apointement'
import Notification from '../components/Rendez-vous/Notification'
import AppointementCreate from '../components/Rendez-vous/AppointementCreate'

let clicked = false;
// const resetAction = StackActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName: 'PatientAction' })],
//   });
// const opendraw = <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />;

const opendraw = (navigation) => {
    return(
        <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
    )
}

function pressAjout(navigation){
    // clicked = true
    navigation.navigate('PatientCreate')
}
const SettingsStack = createStackNavigator({
Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
    return {
        headerTitle: 'Settings',
        headerLeft: (
            opendraw
        )
    };
    }
}
});

const FeedStack = createStackNavigator(
{
    Feed: {
    screen: Feed,
    navigationOptions: ({ navigation }) => {
        return {
        headerTitle: 'Feed',
        headerLeft: (
            opendraw
        )
        };
    }
    },
    Detail: {
    screen: Detail
    }
},
{
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
}
);

const ProfileStack = createStackNavigator({
Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
        return {
            headerTitle: 'Profile',
            headerLeft: (
                opendraw
            )
        };
        }
    }
});

const DashboardTabNavigator = createBottomTabNavigator(
{
    FeedStack,
    ProfileStack,
    SettingsStack
},
{
    navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
      return {
          header: null,
          headerTitle: routeName
      };
    }
});

const DashboardStackNavigator = createStackNavigator(
{
    DashboardTabNavigator: DashboardTabNavigator
},
{
    defaultNavigationOptions: ({ navigation }) => {
      return {
          headerLeft: (
            opendraw
          ),
          headerStyle: {
              borderRadius: 2,
              borderColor: '#ddd',
              shadowColor: '#000',
              borderBottomWidth: 1,
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1,
              marginBottom: 10
          },
      };
    },
});

/*Patient navigation */
const PatientActionStack = createStackNavigator(
{
    PatientAction: {
        screen: PatientAction,
        navigationOptions: () => {
                return {
                    header: () => {
                    // clicked = false
                    return null
                }
            }
        }
    },
    PatientCreate: {
        screen: PatientCreate,
        navigationOptions: () => {
            // clicked = true
            // navigation.dispatch(resetAction);
            return{
                headerStyle: {
                    borderRadius: 2,
                    borderColor: '#ddd',
                    shadowColor: '#000',
                    borderBottomWidth: 1,
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                },
                tabBarVisible: false
            }
        }
    },
    PatientEdit: {
        screen: PatientEdit,
        navigationOptions: () => {
            clicked = true
            // navigation.dispatch(resetAction);
            return{
                headerStyle: {
                    borderRadius: 2,
                    borderColor: '#ddd',
                    shadowColor: '#000',
                    borderBottomWidth: 1,
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                },
                tabBarVisible: false
            }
        }
    }
},
{
    defaultNavigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state;
        console.log(routeName)
        if(routeName === 'PatientCreate'){
            clicked = true
        }else{
            clicked = false
            // return null
        }
    }
});

const PatientStack = createStackNavigator(
    {
        Patient: {
            screen: Patients,
            navigationOptions: () => {
                return {
                    header: null
                };
            }
        },
        PatientEdit: {
            screen: PatientEdit,
            navigationOptions: () => {
                clicked = true
                // navigation.dispatch(resetAction);
                return{
                    headerStyle: {
                        borderRadius: 2,
                        borderColor: '#ddd',
                        shadowColor: '#000',
                        borderBottomWidth: 1,
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1,
                    },
                    tabBarVisible: false
                }
            }
        }
    },{
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            console.log(routeName)
            if(routeName === 'PatientEdit'){
                clicked = true
            }else{
                clicked = false
                // return null
            }
        }
    });

const PatientFavoriteStack = createStackNavigator(
    {
        PatientFavorite: {
            screen: PatientFavorite,
            navigationOptions: () => {
                return {
                    header: null
                };
            }
        },
        PatientEdit: {
            screen: PatientEdit,
            navigationOptions: () => {
                clicked = true
                // navigation.dispatch(resetAction);
                return{
                    headerStyle: {
                        borderRadius: 2,
                        borderColor: '#ddd',
                        shadowColor: '#000',
                        borderBottomWidth: 1,
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1,
                    },
                    tabBarVisible: false
                }
            }
        }
    },{
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            console.log(routeName)
            if(routeName === 'PatientEdit'){
                clicked = true
            }else{
                clicked = false
                // return null
            }
        }
    });

const PatientTabNavigator = createBottomTabNavigator(
{
    PatientStack: {
        screen: PatientStack,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    opendraw(navigation)
                ),
                tabBarIcon: () => {
                    return <Icon style={{ paddingLeft: 10 }} name="md-search" size={30} />
                },
                header: null
            };
        }
    },
    PatientActionStack: {
        screen: PatientActionStack,
        navigationOptions: ({ navigation }) => {
            if(clicked){
                return{
                    header: null
                }
            }
            return {
                headerTitle: 'Gestion du Patients',
                title: 'Gestion du Patients',
                headerLeft: (
                <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer() } name="md-menu" size={30} />
                ),
                tabBarIcon: () => {
                    return <Fon style={{ paddingLeft: 10 }} name="tasks" size={30} />
                }
            };
        }
    },
    PatientFavoriteStack: {
        screen: PatientFavoriteStack,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Patients préféré',
                title: 'Patients préféré',
                headerLeft: (
                    opendraw(navigation)
                ),
                tabBarIcon: () => {
                    return <Mat style={{ paddingLeft: 10 }} name="favorite" size={30} />
                }
            };
        }
    }
},{
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF'
    }
});

const PatientStackNavigator = createStackNavigator(
{
  PatientTabNavigator: PatientTabNavigator,
},
{
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      let headerRight = null;
    //   console.log(routeName)
        switch(routeName) {
            case 'PatientStack':
                if(clicked){
                    return{
                        header: () => {
                            clicked = false
                            return null
                        }
                    }
                }
                return {
                    headerTitle:'Patients',
                    headerLeft: (
                        opendraw(navigation)
                    ),
                    headerRight: headerRight,
                    headerStyle: {
                        borderRadius: 2,
                        borderColor: '#ddd',
                        shadowColor: '#000',
                        borderBottomWidth: 1,
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1,
                    }
                }
            break;
            case 'PatientActionStack':
                console.log(clicked)
                if(clicked){
                    return{
                        header: () => {
                            clicked = false
                            return null
                        }
                    }
                }
                return {
                    headerTitle:'Gestion du Patients',
                    headerLeft: (
                        opendraw(navigation)
                    ),
                    headerRight: ( <TouchableOpacity style={ styles.buttonRight } onPress={() => pressAjout(navigation) }><Text style={ styles.rightText }>Ajouter</Text></TouchableOpacity> ),
                    headerStyle: {
                        borderRadius: 2,
                        borderColor: '#ddd',
                        shadowColor: '#000',
                        borderBottomWidth: 1,
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1,
                    },
                }
            break;
            case 'PatientFavoriteStack':
                if(clicked){
                    return{
                        header: () => {
                            clicked = false
                            return null
                        }
                    }
                }
                return {
                    headerTitle:'Patients préféré',
                    headerLeft: (
                        opendraw(navigation)
                    ),
                    headerRight: headerRight,
                    headerStyle: {
                        borderRadius: 2,
                        borderColor: '#ddd',
                        shadowColor: '#000',
                        borderBottomWidth: 1,
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1,
                    }
                }
            break;
            default:
                return{
                    header: null
                }
        }
    },
});

/*Apoitement Navigation */
const ApoitementStack = createStackNavigator(
{
    Appointements: {
        screen: Apoitements,
        navigationOptions: () => {
            return {
                header: null
            };
        }
    },
    AppointementCreate: {
        screen: AppointementCreate,
        navigationOptions: () => {
            // clicked = true
            // navigation.dispatch(resetAction);
            return{
                headerStyle: {
                    borderRadius: 2,
                    borderColor: '#ddd',
                    shadowColor: '#000',
                    borderBottomWidth: 1,
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                },
                tabBarVisible: false
            }
        }
    },
},{
    defaultNavigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state;
        console.log(routeName)
        if(routeName === 'AppointementCreate'){
            clicked = true
        }else{
            clicked = false
        }
    }
});

const ApoitementTabNavigator = createBottomTabNavigator(
{
    ApoitementStack: {
        screen: ApoitementStack,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    opendraw(navigation)
                ),
                tabBarIcon: () => {
                    return <Ant style={{ paddingLeft: 10 }} name="calendar" size={30} />
                },
                header: null
            };
        }
    },
    NotificationStack: {
        screen: Notification,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    opendraw(navigation)
                ),
                tabBarIcon: () => {
                    return <Icon style={{ paddingLeft: 10 }} name="ios-notifications" size={30} />
                },
                header: null
            };
        }
    },
},{
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF'
    }
});
    

const ApoitementStackNavigator = createStackNavigator(
    {
        ApoitementTabNavigator: ApoitementTabNavigator,
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          let headerRight = null;
        //   console.log(routeName)
            switch(routeName) {
                case 'ApoitementStack':
                    if(clicked){
                        return{
                            header: () => {
                                clicked = false
                                return null
                            }
                        }
                    }
                    return {
                        headerTitle:'Appoitements',
                        headerLeft: (
                            opendraw(navigation)
                        ),
                        headerRight: ( <TouchableOpacity style={ styles.buttonRight } onPress={() => navigation.navigate('AppointementCreate') }><Text style={ styles.rightText }>Ajouter</Text></TouchableOpacity> ),
                        headerStyle: {
                            borderRadius: 2,
                            borderColor: '#ddd',
                            shadowColor: '#000',
                            borderBottomWidth: 1,
                            shadowOffset: {width: 2, height: 2},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 1,
                        }
                    }
                break;
                case 'NotificationStack':
                    console.log(clicked)
                    if(clicked){
                        return{
                            header: () => {
                                clicked = false
                                return null
                            }
                        }
                    }
                    return {
                        headerTitle:'Notification',
                        headerLeft: (
                            opendraw(navigation)
                        ),
                        headerStyle: {
                            borderRadius: 2,
                            borderColor: '#ddd',
                            shadowColor: '#000',
                            borderBottomWidth: 1,
                            shadowOffset: {width: 2, height: 2},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 1,
                        },
                    }
                default:
                    return{
                        header: null
                    }
            }
        },
    });

const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: {
        screen: DashboardStackNavigator
    },
    Patients: {
      screen: PatientStackNavigator,
      navigationOptions: ({ navigation }) => {
        // const { routeName } = navigation.state.routes[navigation.state.index];
          return{
            drawerIcon: () => (
                <Icon
                    name="md-bed"
                    size={30}
                />
            )   
          }
        }
    },
    Appoitements: {
        screen: ApoitementStackNavigator,
        navigationOptions: ({ navigation }) => {
            // const { routeName } = navigation.state.routes[navigation.state.index];
                return{
                drawerIcon: () => (
                    <Ant
                        name="calendar"
                        size={25}
                    />
                )   
            }
        }
    },
});

const AppSwitchNavigator = createSwitchNavigator({
    Login: { 
        screen: Login
    },
    Dashboard: { 
        screen: AppDrawerNavigator 
    }
});

const styles = StyleSheet.create({
    rightText: {
        color: '#2d8dfd'
    },
    buttonRight: {
        marginRight: 10
    }
})
export default createAppContainer(AppSwitchNavigator)