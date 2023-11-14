import * as React from 'react';
import { Card, Button, Text, Title, Subheading } from 'react-native-paper';
import InventoryScreen from '@/components/inventory/InventoryScreen';
import { router } from 'expo-router';
import { postNewTrip } from '@/utils/utils';

const GuardianTripCard = ({
	tripId,
	tripDetails,
	handleEditTrip,
	handleDeleteTrip,
	userRole,
}) => {
	return (
		<Card style={{ margin: 16 }}>
			<Card.Content>
				<Title style={{ fontSize: 24, fontWeight: 'bold' }}>
					{tripDetails.name}
				</Title>
				<Text variant="titleMedium">{tripDetails.date}</Text>
				<Subheading style={{ color: 'blue' }}>
					{tripDetails.location}
				</Subheading>
				<Text variant="bodyMedium">{tripDetails.description}</Text>
			</Card.Content>
			<Card.Cover
				style={{ padding: 6 }}
				source={{ uri: 'https://picsum.photos/700' }}
			/>
			<Card.Actions
				style={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<Button
					style={{ marginRight: 'auto', flex: 1 }}
					onPress={async () =>
						// router.push({
						// 	pathname: `/trip/(${userRole})/[tripId]`,
						// 	params: {
						// 		tripId,
						// 		tripTitle: tripDetails.name,
						// 	},
						// })
						{
							const tripObj = {
								name: "Sam's test trip",
								organiser: "A7xBtDNVYaeG8JwbNDum4Iw6BKr1"
							}
							const newTripId = await postNewTrip(tripObj)
							console.log(newTripId);
							// deleteTrip("-NjCZZQuujWcPORr-96l");
						}
					}
				>
					Info
				</Button>
			</Card.Actions>
		</Card>
	);
};

export default GuardianTripCard;
