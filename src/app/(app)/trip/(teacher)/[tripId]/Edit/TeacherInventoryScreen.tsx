import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback, Alert, Platform,Keyboard,  KeyboardAvoidingView, TextInput as RNTextInput } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getTripInventory, getSingleTrip, addInventorytoTripAndStudents } from "@/utils/utils";
import { database } from "@/utils/config";
import { ref } from "firebase/database";
import { update } from "@firebase/database";
import { useGlobalSearchParams } from "expo-router";

interface InventoryData {
  [key: string]: string;
}
interface FirebaseUpdates {
  [key: string]: string | boolean | null;
}




const TeacherInventoryScreen = () => {
  const [inventory, setInventory] = useState<string[]>([]);
  const [addText, setAddText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(-1); // Initialized as -1 to indicate no item is being edited
  const { tripId }: { tripId?: string } = useGlobalSearchParams(); //deals with undefined
  const textInputRef = useRef<RNTextInput>(null); // needed this to stop typescript complaining

  useEffect(() => {
    getTripInventory(tripId)
      .then((data: InventoryData) => {
        console.log(data)
        if(data){const itemsArray = Object.values(data);
          console.log(itemsArray)
        setInventory(itemsArray);} else {
          setInventory([])
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tripId]);



  function findKey(item: string, itemData: InventoryData) {
    for (const key in itemData) {
      if (itemData[key] === item) {
        return key;
      }
    }
  }

  const handleAddItem = () => {
    if (addText && tripId) {
      const updatedInventory = [...inventory, addText];
      setInventory(updatedInventory);
    
      addInventorytoTripAndStudents(tripId, addText)

      setAddText(""); //clear addText and blur focus
      if (textInputRef.current) {
        textInputRef.current.blur();
      }
    } 
  };




  const handleDeleteItem = (itemIndex: number) => {
    if (!inventory || itemIndex < 0 || itemIndex >= inventory.length) {
      return;
    }
  
    let inventKey: string | null | undefined = null;
    let tripInventory: InventoryData | null = null;
  
    getTripInventory(tripId)
      .then((data) => {
        tripInventory = data;

        if(tripInventory) {
          const itemToDelete = inventory[itemIndex]
          inventKey = findKey(itemToDelete, tripInventory);

          if (inventKey) {
            const tripRef = ref(database, `trips/${tripId}/inventory`);
            return update(tripRef, { [inventKey]: null }); // Delete on trip
          } 
        }
      })
      .then(() => {
        return getSingleTrip(tripId);
      })
      .then((singleTripData) => {
        const updates: FirebaseUpdates = {};
        const students = singleTripData.students;
        const keys = Object.keys(students);
  
        keys.forEach((studentKey) => {
          updates[`students/${studentKey}/trips/${tripId}/inventory/${inventKey}`] = null;
        });
  
        // Delete on each student DB
        return update(ref(database), updates);
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




  const handleEditItemName = (index: number, editedValue: string, item: string) => {
    if (editedIndex === index) {
          // Update the item's name in the inventory
          const tripRef = ref(database, `trips/${tripId}/inventory`);
          const updates: FirebaseUpdates = {};
      
          if (inventory) {
            getTripInventory(tripId).then((data) => {
              const inventKey = findKey(item, data);
              updates[`/trips/${tripId}/inventory/` + inventKey] = editedValue;
              
              getSingleTrip(tripId).then((data) => {
                const students = data.students;
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
            const updates: FirebaseUpdates = {};
            updates[`/trips/${tripId}/inventory/`] = null;

            getSingleTrip(tripId)
              .then((data) => {
                const students = data.students;
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


  type RenderItemProps = {
    item: string,
    index: number
  }

  const RenderItem = ({ item, index }: RenderItemProps) => {
    const [checked, setChecked] = useState(false);
    const [editedValue, setEditedValue] = useState(item);

    const handlePress = (index: number, item: string) => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ margin: 40 }}>
          <View style={{ flexDirection: "row",justifyContent: "space-between", alignItems: "center" }}>
            <TextInput
              ref={textInputRef}
              placeholder="Add a new item"
              value={addText}
              onChangeText={(text) => setAddText(text)}
              style={{flex:3}}
              />
            <Button
              icon="plus-circle-outline"
              mode="contained"
              textColor="white"
              onPress={() => handleAddItem()}
              style={{ borderRadius: 5, marginLeft: 5, flex:1 }}
              >
              Add
            </Button>
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

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:10 }}>
            <Button
              icon="lead-pencil"
              mode="contained"
              textColor={"white"}
              buttonColor={isEditing ? "blue" : undefined}
              style={{ borderRadius: 5,flex: 1, marginLeft: 5 }}
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
              style={{ borderRadius: 5,flex: 1, marginLeft: 5 }}
              onPress={() => {
                clearList();
              }}
              >
              Clear List
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TeacherInventoryScreen;