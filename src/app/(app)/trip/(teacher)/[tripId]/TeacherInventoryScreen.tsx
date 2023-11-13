import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getTripInventory } from "@/utils/utils";
import { database } from "../../../../../utils/config";
import { push, ref } from "firebase/database";
import { update } from "@firebase/database";

const TeacherInventoryScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1); // Initialized as -1 to indicate no item is being edited
  const [checked, setChecked] = useState(false);
  const [trip, setTrip] = useState(1);

  function findKey(item, itemData) {
    for (const key in itemData) {
      if (itemData[key] === item) {
        return key;
      }
    }
  }

  const handleDeleteItem = (itemIndex: number) => {
    if (inventory) {
      //update state
      const updatedItems = [...inventory];
      updatedItems.splice(itemIndex, 1);
      setInventory(updatedItems);
      //delete on trip
      const tripData = getTripInventory(1).then((data) => {
        const tripRef = ref(database, "/trips/1/inventory");
        const inventKey = findKey(inventory[itemIndex], data);
        return update(tripRef, {
          [inventKey]: null,
        }).then(() => {
          const students = ref(database, "trips/1/students"); //todo implement none-hardcoded trip id
          for (const key in students) {
            const studentData = ref(
              database,
              `students/${key}/trips/1/inventory`,
            ); //todo none hardcoded trip id
            for (const key2 in studentData) {
              if (studentData[key].item_name === inventory[itemIndex]) {
                const updatePath = ref(
                  database,
                  `students/${key}/trips/1/inventory/`,
                );
                update(updatePath, {
                  [key2]: null,
                });
              }
            }
          }
        });
      });
      //delete on each student
    }
    // need to handle API after this
  };
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