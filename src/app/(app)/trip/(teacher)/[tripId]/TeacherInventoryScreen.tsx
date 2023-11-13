import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getTripInventory, getSingleTrip } from "@/utils/utils";
import { database } from "@/utils/config";
import { push, ref, child } from "firebase/database";

import { update } from "@firebase/database";

const TeacherInventoryScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [addText, setAddText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1); // Initialized as -1 to indicate no item is being edited
  const [tripId, setTripId] = useState(1);

  useEffect(() => {
    getTripInventory(1)
      .then((data) => {
        const itemsArray = [];
        for (let key in data) {
          itemsArray.push(data[key]);
        }
        setInventory(itemsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    ).key; //todo implement non-hardcoded trip id
    const updates = {};
    updates[`/trips/${tripId}/inventory/` + newItemKey] = addText;

    getSingleTrip(tripId)
      .then((data) => {
        const students = data.val().students;
        const keys = Object.keys(students);
        keys.forEach((itemKey) => {
          updates[
            `students/${itemKey}/trips/${tripId}/inventory/` + newItemKey
          ] = addText;
        });
      })
      .then(() => {
        console.log(updates);
        return update(ref(database), updates);
      })
      .catch((error) => console.log(error));

    setAddText(""); //do this last
  };

  const handleDeleteItem = (itemIndex: number) => {
    if (inventory) {
      //update state
      const updatedItems = [...inventory];
      updatedItems.splice(itemIndex, 1);
      setInventory(updatedItems);
      //delete on trip
      let inventKey = "";
      const tripData = getTripInventory(1).then((data) => {
        const tripRef = ref(database, "/trips/1/inventory");
        inventKey = findKey(inventory[itemIndex], data);
        return update(tripRef, {
          [inventKey]: null,
        }).then(() => {
          getSingleTrip(tripId).then((data) => {
            const updates = {};
            const students = data.val().students;
            const keys = Object.keys(students);
            keys.forEach((studentKey) => {
              updates[
                `students/${studentKey}/trips/${tripId}/inventory/${inventKey}`
              ] = null;
            });
            console.log(updates);
            return update(ref(database), updates);
          });
        });
      });
    }
    // need to handle API after this
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
    // Update the item's name in the inventory
    const tripRef = ref(database, `trips/${trip}/inventory`);

    if (inventory) {
      const tripData = getTripInventory(1).then((data) => {
        const tripRef = ref(database, "/trips/1/inventory");
        const inventKey = findKey(item, data);
        return update(tripRef, {
          [inventKey]: editedValue,
        });
      });
      const updatedInventory = [...inventory];
      updatedInventory[index] = editedValue;
      setInventory(updatedInventory);

      setEditedIndex(-1);
      setIsEditing(false); // Stop editing after saving
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
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
          <TouchableWithoutFeedback onPress={handlePress}>
            <Text style={{ marginLeft: 16 }}>{item}</Text>
          </TouchableWithoutFeedback>
        )}

        {isEditing ? (
          <Button
            icon="lead-pencil"
            mode="text"
            textColor={editedIndex === index ? "green" : "blue"}
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
            style={{ position: "absolute", right: 0, zIndex: 1 }}
          >
            Delete
          </Button>
        ) : null}
      </View>
    );
  };

  return (
    <View style={{ maxHeight: 600 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Add a new item"
          value={addText}
          onChangeText={(text) => setAddText(text)}
        />
        <Button
          icon="plus-circle-outline"
          mode="contained"
          buttonColor="#73B5D4"
          textColor="black"
          onPress={() => handleAddItem()}
          style={{ borderRadius: 5, marginLeft: 5 }}
        >
          Add
        </Button>
        <Button
          icon="lead-pencil"
          mode="contained"
          textColor={isEditing ? "white" : "black"}
          buttonColor={isEditing ? "green" : "#73B5D4"}
          style={{ borderRadius: 5, marginLeft: 5 }}
          onPress={() => {
            handleEditPress();
          }}
        >
          {isEditing ? "Done" : "Edit"}
        </Button>
      </View>
      <FlatList
        style={{ borderWidth: 3, borderColor: "#73B5D4", marginTop: 20 }}
        data={inventory}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
      />
    </View>
  );
};

export default TeacherInventoryScreen;
