import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getTripInventory, getSingleTrip } from "@/utils/utils";
import { database } from "@/utils/config";
import { push, ref, child } from "firebase/database";
import { update } from "@firebase/database";
import { useGlobalSearchParams } from "expo-router";



const TeacherInventoryScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [addText, setAddText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1); // Initialized as -1 to indicate no item is being edited
	const { tripId } = useGlobalSearchParams();
  const textInputRef = useRef();

  useEffect(() => {
    
    getTripInventory(tripId)
      .then((data) => {
        const itemsArray = Object.values(data);
        setInventory(itemsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tripId]);



  function findKey(item, itemData) {
    for (const key in itemData) {
      if (itemData[key] === item) {
        return key;
      }
    }
  }

  const handleAddItem = () => {
    if (addText) {
      const updatedInventory = [...inventory, addText];
      setInventory(updatedInventory);
    }

    const newItemKey = push(
      child(ref(database), `trips/${tripId}/inventory`),
    ).key; 
    const updates = {};
    updates[`/trips/${tripId}/inventory/` + newItemKey] = addText;


    setAddText(""); //clear addText and blur focus
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };




  const handleDeleteItem = (itemIndex: number) => {
    if (!inventory) {
      return;
    }
  
    let inventKey = "";
    let tripInventory = null;
  
    getTripInventory(tripId)
      .then((data) => {
        tripInventory = data;
        const tripRef = ref(database, `trips/${tripId}/inventory`);
        inventKey = findKey(inventory[itemIndex], tripInventory);
  
        // Delete on trip
        return update(tripRef, { [inventKey]: null });
      })
      .then(() => {
        // Update state
        const updatedItems = [...inventory];
        updatedItems.splice(itemIndex, 1);
        setInventory(updatedItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  





  const handleEditPress = () => {
    if (!isEditing) {
      setEditedIndex(0);
    } else {
      setEditedIndex(-1);
    }
    setIsEditing(!isEditing);
  };




  const handleEditItemName = (index: number, editedValue: string, item) => {
    if (editedIndex === index) {
          // Update the item's name in the inventory
          const tripRef = ref(database, `trips/${tripId}/inventory`);
          const updates = {};
      
          if (inventory) {
            getTripInventory(tripId).then((data) => {
              const inventKey = findKey(item, data);
              updates[`/trips/${tripId}/inventory/` + inventKey] = editedValue;
              
              getSingleTrip(tripId).then((data) => {
                const students = data.val().students;
                const keys = Object.keys(students);
                keys.forEach((studentKey) => {
                  updates[`students/${studentKey}/trips/${tripId}/inventory/${inventKey}/item_name`] = editedValue;
                })
                return update(ref(database), updates)
              })
              .catch((error) => console.log(error))
      
            })
            const updatedInventory = [...inventory];
            updatedInventory[index] = editedValue;
            setInventory(updatedInventory);
          }
          setEditedIndex(-1);
          setIsEditing(false); // Stop editing after saving
    } else {
      setEditedIndex(index)
    }
  };




  const clearList = () => {
    Alert.alert(
      "Clear Inventory List",
      "Are you sure you want to clear the inventory list for all students on the trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // User pressed OK, clear the inventory list
            const updates = {};
            updates[`/trips/${tripId}/inventory/`] = null;

            getSingleTrip(tripId)
              .then((data) => {
                const students = data.val().students;
                const keys = Object.keys(students);
                keys.forEach((studentKey) => {
                  updates[
                    `students/${studentKey}/trips/${tripId}/inventory/`
                  ] = null;
                });
                return update(ref(database), updates);
              })
              .catch((error) => console.log(error));

            setInventory([]);
          },
        },
      ]
    );
  };


  const RenderItem = ({ item, index }) => {
    const [checked, setChecked] = useState(false);
    const [editedValue, setEditedValue] = useState(item);

  const handlePress = (index, item) => {
    setEditedIndex(index);
    setEditedValue(item);

  };

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          paddingLeft: 20, backgroundColor: "white", padding: 10, marginBottom: 10, borderWidth: 3, borderColor: '#28a745', borderRadius: 8
        }}
      >
        <Ionicons
          name={checked ? "ios-trash-bin" : "ios-trash-bin-outline"}
          size={24}
          color="black"
          onPress={() => {
            setChecked(!checked);
          }}
        />

        {editedIndex === index && isEditing ? (
          <TextInput
            style={{ width: 200, height: 30, marginLeft: 16 }}
            value={editedValue}
            onChangeText={(text) => setEditedValue(text)}
          />
        ) : (
          <TouchableWithoutFeedback onPress={() => handlePress(index,item)}>
            <Text style={{ marginLeft: 16, marginRight: 20, fontSize: 18}}>{item}</Text>
          </TouchableWithoutFeedback>
        )}

        {isEditing ? (
          <Button
            icon="lead-pencil"
            mode="text"
            textColor={editedIndex === index ? "green" : "blue"}
            style={{position: "absolute", right: 0}}
            onPress={() => {
              handleEditItemName(index, editedValue, item);
            }}
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
            style={{ position: "absolute", right: 0, backgroundColor: 'white', zIndex: 1, borderRadius: 0}}
          >
            Delete
          </Button>
        ) : null}
      </View>
    );
  };

  return (
    <View style={{ margin: 40 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          ref={textInputRef}
          placeholder="Add a new item"
          value={addText}
          onChangeText={(text) => setAddText(text)}
          style={{width:150}}
        />
        <View style={{ width: 150}}>
          <Button
            icon="plus-circle-outline"
            mode="contained"
            // buttonColor="#73B5D4"
            textColor="white"
            onPress={() => handleAddItem()}
            style={{ borderRadius: 5, marginLeft: 5 }}
            >
            Add
          </Button>
        </View>
      </View>

      <FlatList
        style={{
          maxHeight: 500,
          borderRadius: 5,
          backgroundColor: "#E4E1E1",
        }}
        data={inventory}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
      />
      <View style={{ flexDirection: "row", alignItems: "center", marginTop:10 }}>
        <Button
          icon="lead-pencil"
          mode="contained"
          textColor={"white"}
          buttonColor={isEditing ? "blue" : null}
          style={{ borderRadius: 5, marginLeft: 5 }}
          onPress={() => {
            handleEditPress();
          }}
        >
          {isEditing ? "Done" : "Edit Names"}
        </Button>
      <Button
        icon="delete"
        mode="contained"
        textColor="white"
        style={{ borderRadius: 5, marginLeft: 5 }}
        onPress={() => {
          clearList();
        }}
        >
        Clear Inventory List
      </Button>
        </View>
    </View>
  );
};

export default TeacherInventoryScreen;

