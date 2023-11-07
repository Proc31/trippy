import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Checkbox, TextInput, Button } from 'react-native-paper';

type Item = {
  name: string;
  status: boolean;
}

const dummyItems: Item[] = [
  {
    "name": "Skis",
    "status": false
  },
  {
    "name": "Snowboards",
    "status": false
  },
  {
    "name": "Ski boots",
    "status": false
  },
  {
    "name": "Snowboard boots",
    "status": false
  },
  {
    "name": "Ski poles",
    "status": false
  },
  {
    "name": "Helmet",
    "status": false
  },
  {
    "name": "Ski jackets",
    "status": false
  },
  {
    "name": "Ski pants",
    "status": false
  },
  {
    "name": "Snowboard pants",
    "status": false
  },
  {
    "name": "Thermal underwear",
    "status": false
  },
  {
    "name": "Gloves",
    "status": false
  },
  {
    "name": "Goggles",
    "status": false
  },
  {
    "name": "Ski socks",
    "status": false
  },
  {
    "name": "Hand warmers",
    "status": false
  },
  {
    "name": "Lift tickets",
    "status": false
  },
  {
    "name": "Ski passes",
    "status": false
  },
  {
    "name": "Snacks",
    "status": false
  },
  {
    "name": "Water bottles",
    "status": false
  },
  {
    "name": "Sunscreen",
    "status": false
  },
  {
    "name": "Lip balm",
    "status": false
  },
];

const getItems = (): Promise<Item[]> => {
    return new Promise((resolve, reject) => {
        resolve(dummyItems)
    })
}


const InventoryChecklist = () => {
  const [items, setItems] = useState<Item[] | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    getItems()
    .then((items) => {
        setItems(items)
    })
    .catch((err) => {
        console.log(err)
    })
  }, [])

  const handleItemCheck = (itemIndex: number) => {
    // Update the checked status in the state
    if(items) {
      const updatedItems = [...items];
      updatedItems[itemIndex].status = !updatedItems[itemIndex].status;
      setItems(updatedItems);
    }
  };

  const handleAddItem = () => {
    if (text) {
      const newItem = {
        name: text,
        status: false,
      };
      const updatedItems = [...(items || []), newItem];
      setItems(updatedItems);
      setText("");
    }
  }

  const handleDeleteItem = (itemIndex: number) => {
    if (items) {
      const updatedItems = [...items];
      updatedItems.splice(itemIndex, 1);
        setItems(updatedItems);
    }
    // need to handle API after this
  };

  type ItemProps = {
    item: Item;
    index: number
  }

  const RenderItem = ({ item, index }: ItemProps) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox
        status={item.status ? 'checked' : 'unchecked'}
        onPress={() => handleItemCheck(index)}
      />
      <Text style={{ marginLeft: 16 }}>{item.name}</Text>
      {item.status ? <Button icon="delete" mode="text" textColor="red" onPress={() => handleDeleteItem(index)} >Delete</Button> : null}
    </View>
  )

  return (
    <View style={{maxHeight:600}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          placeholder='Add a new item'
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button icon="plus-circle-outline" mode="contained" buttonColor='#73B5D4' textColor='black' onPress={() => handleAddItem()} style={{borderRadius:5, marginLeft:5}}>Add</Button>
      </View>
      <FlatList style={{borderWidth: 3, borderColor: '#73B5D4', marginTop: 20 }}
        data={items}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({item, index}) => <RenderItem item={item} index={index}/>}
      />
    </View>
  );
};

export default InventoryChecklist;