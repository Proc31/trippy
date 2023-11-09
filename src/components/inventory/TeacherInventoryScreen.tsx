import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Checkbox, TextInput, Button } from 'react-native-paper';
import { ref, onValue, push } from 'firebase/database';
import { getTripInventory } from '@/utils/utils';
import { useNavigation } from '@react-navigation/native';


type Item = {
  item_name: string;
  checked: boolean;
};

// const tripInventoryRef = ref(database, 'trips/1/inventory')

const TeacherInventoryScreen = () => {
  const [inventory, setInventory] = useState<Item[] | null>(null);
  const [text, setText] = useState('');
  const [editedIndex, setEditedIndex] = useState(-1); // Initialized as -1 to indicate no item is being edited
  const [editedValue, setEditedValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {


    getTripInventory(1)
    .then((data) => {
      setInventory(data)
      console.log(inventory)
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


  const handleEditItemName = (index: number, editedName: string) => {
    // Update the item's name in the inventory
    if (inventory) {
      const updatedInventory = [...inventory];
      updatedInventory[index].item_name = editedName;
      setInventory(updatedInventory);
            setEditedIndex(-1); // Stop editing after saving
    }
  };

  const handleItemCheck = (itemIndex: number) => {
    // Update the checked status in the state
    if (inventory) {
      const updatedInventory = [...inventory];
      updatedInventory[itemIndex].checked = !updatedInventory[itemIndex].checked;
      setInventory(updatedInventory);
    }
  };

  const handleAddItem = () => {
    if (text) {
      const newItem = {
        item_name: text,
        checked: false,
      };

      push(itemsRef, newItem)
        .then(() => {
          const updatedItems = [...(inventory || []), newItem];
          setInventory(updatedItems);
          setText('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteItem = (itemIndex: number) => {
    if (inventory) {
      const updatedItems = [...inventory];
      updatedItems.splice(itemIndex, 1);
      setInventory(updatedItems);
    }
  };



  type ItemProps = {
    item: Item;
    index: number
  }


  const RenderItem = ({ item, index }: ItemProps) => {
    const handlePress = () => {
        setEditedIndex(index);
        setEditedValue(item);
    }
    
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          status={item.checked ? 'checked' : 'unchecked'}
          onPress={() => handleItemCheck(index)}
        />
        {editedIndex === index ? (
          <TextInput
            value={editedValue}
            onChangeText={(text) => setEditedValue(text)}
          />
        ) : (
          <TouchableWithoutFeedback onPress={handlePress}
            >
            <Text style={{ marginLeft: 16 }}>{item}</Text>
          </TouchableWithoutFeedback>
        )}

        {isEditing ? <Button
          icon="lead-pencil"
          mode="text"
          textColor="blue"
          onPress={handlePress}
        >
        </Button> : null }
  
        {item.checked ? (
          <Button
            icon="delete"
            mode="text"
            textColor="red"
            onPress={() => handleDeleteItem(index)}
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
          onPress={handleAddItem}
          style={{ borderRadius: 5, marginLeft: 5 }}
        >
          Add
        </Button>
        <Button
          icon="lead-pencil"
          mode="text"
          textColor="blue"
          onPress={() => {
            handleEditPress()
          }}
        >
          Edit
        </Button>
      </View>
      <FlatList
        style={{ borderWidth: 3, borderColor: '#73B5D4', marginTop: 20 }}
        data={inventory}
        keyExtractor={(item, index) => `${item.item_name}-${index}`}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
        extraData={editedIndex}
      />
    </View>
  );
};

export default TeacherInventoryScreen;