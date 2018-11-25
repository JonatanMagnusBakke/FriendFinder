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

const { width, height } = Dimensions.get('window');

export default class MapScreen extends Component {
	static navigationOptions = {
		title: 'Location',
	};
	constructor(props) {
		super(props);
		this.state = {
            hackHeight: 400,
            username: this.props.navigation.state.params.username,
            password: this.props.navigation.state.params.password,
		}
	}

	componentWillMount() {
		setTimeout(() => this.setState({ hackHeight: height }), 500);
		setTimeout(() => this.setState({ hackHeight: height - 300 }), 1000);
	}
	render() {
		return (
			<View style={styles.container}>
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
							latitude: 37.78825,
							longitude: -122.4324,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					/>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('DateTime')}>
						<View style={styles.listItem}>
							<Text style={styles.name}>{this.state.username}</Text>
                            <Text style={styles.name}>{this.state.password}</Text>
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
});