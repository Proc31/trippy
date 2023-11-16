import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Checkbox} from "react-native-paper";
import { ref, onValue, set } from "firebase/database";
import { database } from '@/utils/config';
import { useGlobalSearchParams } from "expo-router";
import { useSession } from "@/auth/ctx";
import { getStudentIdFromGuardian } from '@/utils/utils';

type Item = {
	name: string;
	checked: boolean;
};

const InventoryChecklist = () => {
	const [inventory, setInventory] = useState<Item[] | null>(null);
	const { tripId } = useGlobalSearchParams();
	const { session } = useSession();
	const guardianId = JSON.parse(session).id;

	const [studentId, setStudentId] = React.useState(null);

	//const studentId = '8RYvxdEt5dhBs37l0bUggWXyNk22'

	useEffect(() => {
		getStudentIdFromGuardian(guardianId).then((studentId) => {
			setStudentId(studentId);
			const pupilInventoryRef = ref(
				database,
				`students/${studentId}/trips/${tripId}/inventory`
			);
			onValue(pupilInventoryRef, (snapshot) => {
				const data = snapshot.val();
				if (data) {
					// Convert Firebase data to an array of items and update the state
					const itemsArray: Item[] = Object.keys(data).map(
						(itemKey) => {
							return {
								key: [itemKey],
								name: data[itemKey].item_name,
								checked: JSON.parse(data[itemKey].checked),
							};
						}
					);
					setInventory(itemsArray);
				} else {
					setInventory([]);
				}
			});
		});
	}, []);

	const handleItemCheck = (item, itemIndex: number) => {
		// Update the checked status in the state
		if (inventory) {
			const updatedItems = [...inventory];
			updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
			setInventory(updatedItems);

			// Update DB
			const dbRef = ref(
				database,
				`students/${studentId}/trips/${tripId}/inventory/${item.key}/checked`
			);
			set(dbRef, updatedItems[itemIndex].checked).catch((error) => {
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
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingLeft: 50,
					backgroundColor: 'white',
					padding: 10,
					marginBottom: 10,
					borderWidth: 3,
					borderColor: '#28a745',
					borderRadius: 8,
				}}
			>
				<Checkbox
					status={item.checked ? 'checked' : 'unchecked'}
					onPress={() => handleItemCheck(item, index)}
				/>
				<Text
					style={{
						marginLeft: 16,
						fontSize: 18,
						flexWrap: 'wrap',
						width: 200,
					}}
				>
					{item.name}
				</Text>
			</View>
		);
	};

	if (!inventory || inventory.length === 0) {
		return (
			<View>
				<Text style={{ fontSize: 24 }}>
					No items have been added to the list yet!
				</Text>
			</View>
		);
	}
	return (
		<View style={{ margin: 40, marginTop: 20 }}>
			<Text
				style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}
			>
				Essential items for your trip
			</Text>
			<FlatList
				style={{
					borderRadius: 5,
					backgroundColor: '#E4E1E1',
				}}
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