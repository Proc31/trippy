import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Checkbox} from "react-native-paper";
import { ref, onValue, set } from "firebase/database";
import { database } from '@/utils/config';
import { useGlobalSearchParams } from "expo-router";
import { useSession } from "@/auth/ctx";


type Item = {
  name: string;
  checked: boolean;

};

const InventoryChecklist = () => {
  const [inventory, setInventory] = useState<Item[] | null>(null);
  const { tripId } = useGlobalSearchParams();
  const { session } = useSession();
  //const studentId = JSON.parse(session).id
  const studentId = '8RYvxdEt5dhBs37l0bUggWXyNk22'


  const pupilInventoryRef = ref(
    database,
    `students/${studentId}/trips/${tripId}/inventory`,
  );


  useEffect(() => {
    onValue(pupilInventoryRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        // Convert Firebase data to an array of items and update the state
        const itemsArray: Item[] = Object.keys(data).map((itemKey) => {
          return {
            key: [itemKey],
            name: data[itemKey].item_name,
            checked: JSON.parse(data[itemKey].checked),
          };
        });
        setInventory(itemsArray);
      } else {
        setInventory([]);
      }
    });
  }, []);

  const handleItemCheck = (item, itemIndex: number) => {
    // Update the checked status in the state
    if (inventory) {
      const updatedItems = [...inventory];
      updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
      setInventory(updatedItems);
  
      // Update DB
      const dbRef = ref(database, `students/${studentId}/trips/${tripId}/inventory/${item.key}/checked`);
      set(dbRef, 
       updatedItems[itemIndex].checked,
      )
      .catch((error) => {
        console.log(error);
      });
    }
  };
  
  

  type ItemProps = {
    item: Item;
    index: number;
  };

  const RenderItem = ({ item, index }: ItemProps) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 50 }}>
        <Checkbox
          status={item.checked ? "checked" : "unchecked"}
          onPress={() => handleItemCheck(item, index,)}
        />
        <Text style={{ marginLeft: 16 }}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={{}}>
      <FlatList
        style={{ borderWidth: 3, borderColor: "#73B5D4", marginTop: 20 }}
        data={inventory}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
      />
    </View>
  );
};

export default InventoryChecklist;