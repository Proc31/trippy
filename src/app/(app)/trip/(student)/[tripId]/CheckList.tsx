import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Checkbox, TextInput, Button } from "react-native-paper";
import { ref, onValue, push } from "firebase/database";
import { database } from '@/utils/config';

type Item = {
  name: string;
  checked: boolean;
};

const InventoryChecklist = () => {
  const [inventory, setInventory] = useState<Item[] | null>(null);
  const pupilInventoryRef = ref(
    database,
    "students/8RYvxdEt5dhBs37l0bUggWXyNk22/trips/2/inventory",
  );

  const rootRef = ref(database);

  useEffect(() => {
    onValue(pupilInventoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase data to an array of items and update the state
        const itemsArray: Item[] = Object.keys(data).map((key) => {
          return {
            name: data[key].item_name,
            checked: JSON.parse(data[key].checked),
          };
        });
        setInventory(itemsArray);
      } else {
        setInventory([]);
      }
    });
  }, []);

  const handleItemCheck = (itemIndex: number) => {
    // Update the checked status in the state
    if (inventory) {
      const updatedItems = [...inventory];
      updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
      setInventory(updatedItems);
    }
  };

  type ItemProps = {
    item: Item;
    index: number;
  };

  const RenderItem = ({ item, index }: ItemProps) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          status={item.checked ? "checked" : "unchecked"}
          onPress={() => handleItemCheck(index)}
        />
        <Text style={{ marginLeft: 16 }}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={{ maxHeight: 600, width: 250 }}>
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