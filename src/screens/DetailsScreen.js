import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import AddPlaceModal from '../components/addPlaceModal';
import { AntDesign } from '@expo/vector-icons';
import { options } from '../data/FoursquareData';
import { collection, getDocs } from 'firebase/firestore';
import { db, getUserId } from '../../firebase';
import Theme from '../themes/Theme';

/**
 * The Details Screen displaying images, maps and addresses.
 * 
 * @param {Object} route - route parameters
 * @returns renders DetailsScreen
 */
const DetailsScreen = ({ route }) => {
    const [details, setDetails] = useState([]);
    const [address, setAddress] = useState([]);
    const [photoPrefix, setPhotoPrefix] = useState([]);
    const [photoSuffix, setPhotoSuffix] = useState([]);
    const [addListVisible, setAddListVisible] = useState(false);
    const [list, setlist] = useState(null);
    const { item } = route.params;
    const fsq_id = item.fsq_id;

    /**
     * Gets the trip plans.
     */
    useEffect(() => {
      (async () => {
        const querySnapshot = await getDocs(collection(db, 'users', getUserId(), 'lists'));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data().title,
            trips: doc.data().trips
          })
        })
        setlist(list)
      })();
    });

    /**
     * Displays photos of selected location.
     */
    useEffect(() => {
      fetch(`https://api.foursquare.com/v3/places/${fsq_id}/photos`, options)
        .then(res => res.json())
        .then((res) => {
          setPhotoPrefix(res[0].prefix);
          setPhotoSuffix(res[0].suffix);
        })
    }, []);

    /** 
     * Displays details of selected location. 
     */
    useEffect(() => {
    fetch(`https://api.foursquare.com/v3/places/${fsq_id}`, options)
      .then(res => res.json())
      .then((res) => {
        setDetails(res);
        setAddress(res.location);
      })
    }, []);


    return (
        <View style={ Theme.container }>

          <Modal
            animationType='slide'
            visible={addListVisible}
            onRequestClose={() => setAddListVisible(false)}>
            <AddPlaceModal 
              closeModal={() => setAddListVisible(false)}
              lists={list}
              name={details.name}
              latitude={item.geocodes.main.latitude}
              longitude={item.geocodes.main.longitude}
            />
          </Modal>

          <ScrollView>

            <View>
              <Image source={{ uri: `${photoPrefix}original${photoSuffix}` }} style={ Theme.detailsImage} />
            </View>

            <View style={Theme.detailsWButtonContainer}>
              <Text style={Theme.detailsTitle}>{details.name}</Text>
              <TouchableOpacity>
                    <AntDesign name="close" size={48} color="black" />
                </TouchableOpacity>
            </View>
            <View>
              <Text style={Theme.detailsText}>Address:</Text>
              <Text style={Theme.detailsText}>{address.formatted_address}</Text>
            </View>
            <View style={Theme.mapContainer}>
              <MapView style={Theme.map}
                initialRegion={{
                  latitude: item.geocodes.main.latitude,
                  longitude: item.geocodes.main.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.02,
                }}
              >
                <Marker 
                  coordinate={{
                    latitude: item.geocodes.main.latitude,
                    longitude: item.geocodes.main.longitude
                  }}
                >
                </Marker>
              </MapView>
            
              <View style={ Theme.buttonContainer } >
                <TouchableOpacity
                  style={ Theme.primaryButton }
                  onPress={() => setAddListVisible(true)}>
                    <Text style={ Theme.buttonText }>Add to Plan</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </View>
    );
}

export default DetailsScreen;
