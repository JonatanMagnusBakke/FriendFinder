import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	Button
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

const { width, height } = Dimensions.get('window');




export default class MapScreen extends Component {
	static navigationOptions = {
		title: 'Location',
	};
	constructor(props) {
		super(props);
		this.state = {
			location: null,
			radius: 100,
			friends: [],
			hackHeight: 400,
			username: this.props.navigation.state.params.username,
			password: this.props.navigation.state.params.password,
		}
	}

	componentWillMount() {
			this._getLocationAsync();
		setTimeout(() => this.setState({ hackHeight: height }), 500);
		setTimeout(() => this.setState({ hackHeight: height - 300 }), 1000);
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
		  this.setState({
			errorMessage: 'Permission to access location was denied',
		  });
		}
	
		let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
	  };

	  _updatePos = async () => {
		  this._getLocationAsync()
		const response = await fetch("https://www.jbakke.dk/mini/api/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: {
					userName: this.state.username,
							password: this.state.password,
				  },
				longitude: this.state.location.coords.longitude,
				latitude: this.state.location.coords.latitude
			})
		})
		const json = await response.json();
	  }

	  Friends = async () => {
		const response = await fetch("https://www.jbakke.dk/mini/api/nearbyplayers", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userName: this.state.username,
				radius: this.state.radius
			})
		})
		const json = await response.json();
		this.setState({ friends: json });
	}

	render() {
		let text = 'Getting location..';
    if (this.state.errorMessage) {
      text = "Error in getting locaiton";
    } else if (this.state.location) {
	  text = JSON.stringify(this.state.location);
	  text = "Found";
    }
		return (
			<View style={styles.container}>
			<Text style={styles.paragraph}>{text}</Text>
				<View style={{ paddingBottom: this.state.hackHeight }}>
					<MapView style={styles.map}
						provider="google"
						showsUserLocation={true}
						showsMyLocationButton={true}
						showsCompass={true}
						followsUserLocation={true}
						loadingEnabled={true}
						toolbarEnabled={true}
						zoomEnabled={true}
						rotateEnabled={true}
						zoomControlEnabled={true}

						initialRegion={{
							latitude: 55.676098,
							longitude: 12.568337,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					>
					{this.state.friends.map((f, i)=>{
						return <Marker 
						coordinate={{latitude: f.position[1], longitude: f.position[0]}}
						title={f.user}
						key={i}/>
					})}
					</MapView>
					<TouchableOpacity onPress= {this.Friends}>
						<View style={styles.listItem}>
							<Text style={styles.name}>Find Friends</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress= {this._updatePos}>
						<View style={styles.listItem}>
							<Text style={styles.name}>Update Position</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>

		);
	};
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	map: {
		height: 400
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	name: {
		textAlign: "center",
		color: '#666',
		fontWeight: 'bold',
		fontSize: 20
	},
	listItem: {
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
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center',
	  },
});