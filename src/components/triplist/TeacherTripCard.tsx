import React, { useState } from 'react';
import { Card, Button, Text, Title, Subheading } from 'react-native-paper';
import { Alert } from 'react-native';
import TripEditForm from './EditTripForm';
import { router } from 'expo-router';

const TeacherTripCard = ({
	tripId,
	tripDetails,
	handleEditTrip,
	handleDeleteTrip,
	userRole,
  }) => {
	const [isEditing, setIsEditing] = useState(false);
  
	const toggleEditForm = () => {
	  setIsEditing(!isEditing);
	};
  
	const handleSaveEdit = (editedTrip) => {
	  handleEditTrip(editedTrip);
	  setIsEditing(false);
	};
  
	const confirmDelete = () => {
	  Alert.alert(
		'Confirm Delete',
		'Are you sure you want to delete this trip?',
		[
		  {
			text: 'Cancel',
			style: 'cancel',
		  },
		  {
			text: 'Delete',
			onPress: () => handleDeleteTrip(tripId),
		  },
		],
		{ cancelable: false }
	  );
	};
  
	return (
	  <Card style={{ margin: 16 }}>
		<Button
		  icon="delete"
		  onPress={confirmDelete}
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
					onPress={() =>
						router.push({
							pathname: `/trip/(${userRole})/[tripId]/Start`,
							params: {
								tripId,
								tripTitle: tripDetails.name,
							},
						})
					}
				>
					Start
				</Button>
				<Button
					mode="contained"
					style={{ marginLeft: 'auto', flex: 1 }}
					onPress={() =>
						router.push({
							pathname: `/trip/(${userRole})/[tripId]/Edit`,
							params: {
								tripId,
								tripTitle: tripDetails.name,
							},
						})
					}
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
