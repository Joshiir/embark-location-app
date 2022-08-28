import { Text, View, TouchableOpacity, SafeAreaView, FlatList, Modal, Button } from 'react-native';
import Theme from '../themes/Theme';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AddListModal from '../components/addListModal';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, getUserId } from '../../firebase';


/**
 * The My Trips Screen allowing lists of
 * trip plans to be viewed
 * 
 * @param {Object} navigation - React Navigation prop to move between screens
 * @returns renders DashboardScreen
 */
const DashboardScreen = ({ navigation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitutde, setLongitutde] = useState('');
  const [addListVisible, setAddListVisible] = useState(false);
  const [list, setlist] = useState(null);


  /**
   * When the end user arrives to the Dashboard Screen they are asked to give
   * permission on location access.
   */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
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
   * Retrieves list items.
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
        });
      });
      setlist(list)
    })();
  }, []);

  /**
   * Updates list of trip plans.
   */
  const UpdateList = async () => {
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
  };

  /**
   * Deletes Trip Plan.
   * @param {String} docId 
   */
  const DeleteTripPlan = async (docId) => {
    await deleteDoc(doc(db, 'users', getUserId(), 'lists', docId));
    UpdateList();
  };


  return (
    <View style={Theme.container}>
      

      <Modal
        animationType='slide'
        visible={addListVisible}
        onRequestClose={() => setAddListVisible(false)}>
        <AddListModal 
          closeModal={() => setAddListVisible(false)}
          update={ UpdateList }
        />
      </Modal>

      <View style={ Theme.headerWButtonContainer } >
        <Text style={ Theme.headerWButtonTitle }>My Trips</Text>
        <TouchableOpacity
          onPress={() => setAddListVisible(true)}>
          <AntDesign name="plus" size={48} color="black" />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={Theme.listContainer}>
        <FlatList
          data={ list }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <View style={Theme.item}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TripPlan', {item: item})}>
                <Text style={Theme.listText}>{item.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => DeleteTripPlan(item.id)}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )} 
        />
      </SafeAreaView>

    </View>
  );
}

export default DashboardScreen;
