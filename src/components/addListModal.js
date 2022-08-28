import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Theme from '../themes/Theme';
import { useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { getUserId, db } from '../../firebase';

/**
 * Modal to create Trip Plans.
 * 
 * @param {propType} props - prop to close the modal
 * @returns renders addListModal
 */
const AddListModal = (props) => {
    const [title, setTitle] = useState('');

    /**
     * Creates new trip plan.
     */
    const CreateTripPlan = () => {
        //Create doc
        const myDoc = collection(db, 'users', getUserId(), 'lists')
      
        const docData = {
            'title': title,
            'trips': []
        }
        addDoc(myDoc, docData)
        .then(() => {
            //Success
            props.update()
            props.closeModal()
        })
        .catch((error) => {
            //Failed
            alert(error.message)
        })
    }


    return (
        <View style={ Theme.modalContainer }>
            <View style={ Theme.headerWButtonContainer }>
                <Text style={Theme.headerWButtonTitle}>Create Plan</Text>
                <TouchableOpacity onPress={props.closeModal}>
                    <AntDesign name="close" size={48} color="black" />
                </TouchableOpacity>
            </View>

            <View style={ Theme.inputContainer }>
                <TextInput
                    placeholder='Name'
                    value={ title }
                    onChangeText={text => setTitle(text)}
                    style={ Theme.inputText }
                />
            </View>

            <View style={ Theme.buttonContainer }>
                <TouchableOpacity 
                    style={ Theme.primaryButton }
                    onPress={ CreateTripPlan }>
                    <Text style={ Theme.buttonText }>Create Trip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AddListModal;
