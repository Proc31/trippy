import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getTripInventory } from '@/utils/utils';



const TeacherInventoryScreen = () => {
    const [inventory, setInventory] = useState([]);
    const [text, setText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedIndex, setEditedIndex] = useState(-1); // Initialized as -1 to indicate no item is being edited
    const [checked, setChecked] = useState(false);

  useEffect(() => {
    getTripInventory(1)
    .then((data) => {
      setInventory(data)
      console.log('use Effect')
    })
    .catch((error) => {console.log(error)})
  }, [])

  const handleEditPress = () => {
    if (!isEditing) {
        setEditedIndex(0);
        } else {
        setEditedIndex(-1);
        }

    setIsEditing(!isEditing);
};

  const handleEditItemName = (index: number, editedValue: string) => {
    // Update the item's name in the inventory
    if (inventory) {
        const updatedInventory = [...inventory];
        updatedInventory[index] = editedValue;
        setInventory(updatedInventory);
        setEditedIndex(-1);
        setIsEditing(false) // Stop editing after saving
    }
  };

  const RenderItem = ({ item, index }) => {
    const [checked, setChecked] = useState(false);
    const [editedValue, setEditedValue] = useState(item);

    const handlePress = () => {
      setEditedIndex(index);
      setEditedValue(item);
    };

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
      <Ionicons
        name={checked ? 'ios-trash-bin' : 'ios-trash-bin-outline'}
        size={24}
        color="black"
        onPress={() => {
          setChecked(!checked)
        }}
      />

        {editedIndex === index && isEditing ? (
          <TextInput
          style={{ width: 200, height: 30, marginLeft: 16 }}
            value={editedValue}
            onChangeText={(text) => setEditedValue(text)}
          />
        ) : (
          <TouchableWithoutFeedback onPress={handlePress}
            >
            <Text style={{ marginLeft: 16 }}>{item}</Text>
          </TouchableWithoutFeedback>
        )}

        {isEditing ? (
          <Button
            icon="lead-pencil"
            mode="text"
            textColor={editedIndex === index ? "green" : "blue"}
            onPress={() => {
                handleEditItemName(index, editedValue)
                }
            }   
          >
            {editedIndex === index ? "Save" : null}
          </Button>
        ) : null}
  
        {checked ? (
          <Button
            icon="delete"
            mode="text"
            textColor="red"
            onPress={() => handleDeleteItem(index)}
            style={{position: 'absolute', right: 0, zIndex: 1}}
          >
            Delete
          </Button>
        ) : null}
      </View>

    );
  };

  return (
    <View style={{ maxHeight: 600 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          placeholder="Add a new item"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button
          icon="plus-circle-outline"
          mode="contained"
          buttonColor="#73B5D4"
          textColor="black"
          //onPress={handleAddItem}
          style={{ borderRadius: 5, marginLeft: 5 }}
        >
          Add
        </Button>
        <Button
            icon="lead-pencil"
            mode="contained"
            textColor={isEditing? "white": "black"}
            buttonColor={isEditing? "green": "#73B5D4"}
            style={{ borderRadius: 5, marginLeft: 5 }}
            onPress={() => {
                handleEditPress()
            }}
        >
            {isEditing ? "Done" : "Edit"}
        </Button>
      </View>
      <FlatList
        style={{ borderWidth: 3, borderColor: '#73B5D4', marginTop: 20 }}
        data={inventory}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
      />
    </View>
  );
}

export default TeacherInventoryScreen;