import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import InventoryCheckList from "./InventoryCheckList"


  

export default function InventoryScreen () {
    return (
          <View style={{flex:1, alignItems: 'center', marginTop: 40}}>
              <InventoryCheckList />
          </View>
    )
}