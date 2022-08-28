import { View, Text, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Theme from '../themes/Theme';
import { options } from '../data/FoursquareData';

/**
 * The Explore Screen displaying a list of locations
 * and a filter for the list.
 * 
 * @param {Object} navigation - React Navigation prop to move between screens
 * @returns renders ExploreScreen
 */
const ExploreScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitutde, setLongitutde] = useState('');


  /**
   * Gets the current location of the device.
   */
  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLatitude(currentLocation.coords.latitude);
      setLongitutde(currentLocation.coords.longitude);
      console.log(latitude);
      console.log(longitutde);
    })();
  }, []);


  /**
   * Displays all data when navigating to this screen.
   */
  useEffect(() => {
    fetch('https://api.foursquare.com/v3/places/search?ll=55.86%2C-3.98&categories=16000&fields=fsq_id%2Cname%2Cdistance%2Cgeocodes&limit=10', options)
      .then(res => res.json())
      .then((res) => {
        setData(res.results);
        console.log(res.results)
      })
  }, []);

  /**
   * Displays all data.
   */
  const getAll = () => {
    fetch('https://api.foursquare.com/v3/places/search?ll=55.86%2C-3.98&categories=16032%2C16019%2C16046&fields=fsq_id%2Cname%2Cdistance%2Cgeocodes&limit=10', options)
      .then(res => res.json())
      .then((res) => {
        setData(res.results);
        console.log(res.results)
      });
  }

  /**
   * Displays all park informaiton.
   */
  const getPark = () => {
    fetch('https://api.foursquare.com/v3/places/search?ll=55.86%2C-3.98&categories=16032&fields=fsq_id%2Cname%2Cdistance%2Cgeocodes&limit=10', options)
      .then(res => res.json())
      .then((res) => {
        setData(res.results);
        console.log(res.results)
      });
  }

  /**
   * Displays all trail information.
   */
  const getTrail = () => {
    fetch('https://api.foursquare.com/v3/places/search?ll=55.86%2C-3.98&categories=16019&fields=fsq_id%2Cname%2Cdistance%2Cgeocodes&limit=10', options)
      .then(res => res.json())
      .then((res) => {
        setData(res.results);
        console.log(res.results)
      });
  }

  /**
   * Displays all Scenic information.
   */
  const getScenic = () => {
    fetch('https://api.foursquare.com/v3/places/search?ll=55.86%2C-3.98&categories=16046&fields=fsq_id%2Cname%2Cdistance%2Cgeocodes&limit=10', options)
      .then(res => res.json())
      .then((res) => {
        setData(res.results);
        console.log(res.results)
      });
  }


  return (
    <View style={Theme.container}>
      <Text style={Theme.title}>Explore</Text>


      <View style={ Theme.filterContainer }>
        <ScrollView horizontal>
          <TouchableOpacity
            style={ Theme.filterButton }
            onPress={ getAll } >
            <Text style={ Theme.filterText }>All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ Theme.filterButton }
            onPress={ getPark } >
            <Text style={ Theme.filterText }>Park</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ Theme.filterButton }
            onPress={ getTrail } >
            <Text style={ Theme.filterText }>Trail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ Theme.filterButton }
            onPress={ getScenic } >
            <Text style={ Theme.filterText }>Scenic</Text>
          </TouchableOpacity>
          </ScrollView>
      </View>

      <SafeAreaView style={Theme.listContainer}>
        {data.length < 1?
          <ActivityIndicator size={'large'} />
          :
          <FlatList
            data={data}
            keyExtractor={(item) => {return item.fsq_id.toString()}}
            renderItem={({ item }) => (
              <View style={Theme.item}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', {item: item})}>
                  <Text style={Theme.listText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        }
      </SafeAreaView>

    </View>
  );
}

export default ExploreScreen;
