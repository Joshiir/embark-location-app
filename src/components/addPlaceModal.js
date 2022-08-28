import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Theme from '../themes/Theme';
import { doc, updateDoc } from 'firebase/firestore';
import { getUserId, db } from '../../firebase';

/**
 * Modal to create add locations to a trip plan.
 * 
 * @param {propType} props - prop to close modal, list of plans and location info
 * @returns renders addListModal
 */
const AddPlaceModal = (props) => {
    const [list, setList] = useState(null);
    const listOfTripPlans = props.lists;
    const placeName = props.name;
    const lat = props.latitude;
    const long = props.longitude;

    useEffect(() => {
        (async () => {
            const list = [];
            list.push({
                name: placeName,
                latitude: lat,
                longitude: long
            });
            setList(list);
            console.log(list);
        })();
    }, []);

    /**
     * Add location to a trip plan.
     * @param {String} docId 
     */
    const AddToPlan = (docId) => {
        //Add to doc
        const myDoc = doc(db, 'users', getUserId(), 'lists', docId);
        const docData = {
            'trips': list
        }
        updateDoc(myDoc, docData)
        .then(() => {
            //Success
            console.log('Added to Plan!');
        })
        .catch((error) => {
            //Failed
            alert(error.message);
        })
    };


    return (
        <View style={ Theme.modalContainer }>
            <View style={ Theme.headerWButtonContainer }>
                <Text style={Theme.headerWButtonTitle}>Add to Plan</Text>
                <TouchableOpacity onPress={props.closeModal}>
                    <AntDesign name="close" size={48} color="black" />
                </TouchableOpacity>
            </View>

            <SafeAreaView style={Theme.listContainer}>
                <FlatList
                data={ listOfTripPlans }
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={Theme.item}>
                        <TouchableOpacity
                            onPress={() => AddToPlan(item.id)}>
                            <Text style={Theme.listText}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )} 
                />
            </SafeAreaView>
        </View>
    );
};

export default AddPlaceModal;
