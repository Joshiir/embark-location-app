import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Theme from '../themes/Theme';
import { AntDesign } from '@expo/vector-icons';


/**
 * The Trip Plan Screen allowing for locations within
 * a trip plan to be viewed.
 * 
 * @param {Object} navigation - React Navigation prop to move between screens
 * @returns renders TripPlanScreen
 */
const TripPlanScreen = ({ route }) => {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitutde] = useState(0)

    /**
     * Retrieves selected title and trip list.
     */
    const { item } = route.params;
    let title = item.title;
    let trips = item.trips;

    /**
     * Get trip details
     * @param {String} name 
     */
    const getTrip = (name) => {
        for(i = 0; i < trips.length; i++) {
            console.log(trips[0]);
            if (trips[i].name === name) {
                setLatitude(trips[i].latitude);
                setLongitutde(trips[i].latitude);
            }
        }
    }

    useEffect(() => {
        (async () => {
          const querySnapshot = await getDocs(collection(db, 'users', getUserId(), 'lists'));
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              title: doc.data().title,
              trips: doc.data().trips
            });
          });
          setlist(list)
          console.log(list)
        })();
      }, []);


    return (
    <View style={ Theme.container }>

        <View style={Theme.headerWButtonContainer}>
            <Text style={Theme.headerWButtonTitle}>{title}</Text>
            <AntDesign name="close" size={48} color="black" />
        </View>


        <View style={Theme.mapContainer}>
            <MapView style={Theme.planMap}
                initialRegion={{
                    latitude: { latitude },
                    longitude: { longitude },
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.02,
                }}
                >
                <Marker 
                    coordinate={{
                    latitude: { latitude },
                    longitude: { longitude }
                    }}
                >
                </Marker>
            </MapView>
        </View>

        <SafeAreaView style={Theme.listContainer}>
            <FlatList
            horizontal
            data={trips}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
                <View style={Theme.horizontalItem}>
                    <TouchableOpacity
                        style={Theme.deleteIcon}
                        onPress={() => getTrip(item.name)}>
                            <Text style={Theme.planText}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            )} 
            />
        </SafeAreaView>
    </View>
  );
}

export default TripPlanScreen;
