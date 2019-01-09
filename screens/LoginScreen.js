import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput, 
  Alert
} from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }


    _tryToLogin = async () =>{
      const response = await fetch("https://www.jbakke.dk/mini/api/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        user: {
          userName: this.state.username,
				  password: this.state.password,
        }
			})
		})
    const json = await response.json();
    if(json.error == false)
    {
      this.props.navigation.navigate('Map', this.state)
    }
    else if(json.status == "invalid password, please try again")
    {
      Alert.alert(
        'Invalid Login',
        'Wrong password',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    else
    {
      Alert.alert(
        'Invalid Login',
        'Wrong Username',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    
    }
  
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header}>Friend Finder</Text>
      <TextInput style={styles.listItem} value={this.state.username} onChangeText={(username) => this.setState({username})}></TextInput>
      <TextInput style={styles.listItem} secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({password})}></TextInput>
        <TouchableOpacity onPress={this._tryToLogin}>
          <View style={styles.login}>
          <Text style={styles.name}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  login: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor: '#25dd97',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  listItem: {
    textAlign: 'center',
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
},
name: {
  paddingLeft: 12,
  color: '#666',
  fontWeight: 'bold',
  fontSize: 20, textAlign: 'center'
}, 
header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 100
}
});