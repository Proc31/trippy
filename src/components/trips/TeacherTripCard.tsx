import React, { useState } from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";
import TripEditForm from "./EditTripForm";

const TeacherTripCard = ({
	navigation,
	tripId,
	tripDetails,
	handleEditTrip,
	handleDeleteTrip,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEditForm = () => {
		setIsEditing(!isEditing);
	};

	const handleSaveEdit = (editedTrip) => {
		handleEditTrip(editedTrip);
		setIsEditing(false);
	};

	return (
		<Card style={{ margin: 16 }}>
			<Button
				icon="delete"
				onPress={() => handleDeleteTrip(tripId)}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					zIndex: 1,
					margin: 1,
				}}
			/>
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
					mode="contained"
					style={{ marginRight: 'auto', flex: 1 }}
					onPress={() => navigation.navigate('UserIndex')}
				>
					Start
				</Button>
				<Button
					mode="contained"
					style={{ marginLeft: 'auto', flex: 1 }}
					onPress={toggleEditForm}
				>
					Edit
				</Button>
			</Card.Actions>

			{isEditing && (
				<TripEditForm
					trip={tripDetails} // Pass tripDetails instead of trip
					onSubmit={handleSaveEdit}
					onCancel={toggleEditForm}
				/>
			)}
		</Card>
	);
};

export default TeacherTripCard;
