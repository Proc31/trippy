import React from 'react';
import { Card, IconButton, Button, Text } from 'react-native-paper';
import { Modal, View } from 'react-native';
import { useState } from 'react';
import AddTripForm from './AddTripForm';

const AddTripCard = ({ onPress }) => {
    const [modalVisible, setModalVisible] = useState(false);
  
    const handlePress = () => {
      setModalVisible(true);
      
    };

    const handleCancel = () => {
      setModalVisible(false);
      
    };

    const handleFormSubmit = formData => {
        
        onPress(formData); 
        setModalVisible(false); 
      };
    
      return (
        <View>
          <Card style={{ margin: 16 }}>
            <Card.Content style={{ alignItems: 'center' }}>
              <IconButton icon="plus" size={40} onPress={handlePress} />
            </Card.Content>
          </Card>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add New Trip</Text>
                <AddTripForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
              </View>
            </View>
          </Modal>
        </View>
    );
  };
  

  export default AddTripCard;