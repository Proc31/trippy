import StudentList from "@/components/SORT THESE/StudentList";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper" 
import SendStudentInvites from "@/components/SORT THESE/SendStudentInvites";
import React, { useEffect, useState } from "react";
import theme from "@/utils/theme";
import { useGlobalSearchParams } from "expo-router";
import { getStudents, getSingleTrip } from "@/utils/utils";

export default function InviteStudents() {
  const [students, setStudents] = useState([]);
  const [tripStudents, setTripStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { tripId } = useGlobalSearchParams();

  const consentInfo = null;

  const fetchData = async () => {
    getStudents().then((data) => {
      setStudents(data);
    });
  };

  const fetchTripStudents = async () => {
    getSingleTrip(tripId).then((trip) => {
      const students = Object.keys(trip.students)
      setTripStudents(students)
    })
  }

  useEffect(() => {
    fetchData();
    fetchTripStudents()
  }, [tripStudents]);

  const closeModal = () => {
    setModalVisible(false);
  };


  const [checkedItems, setCheckedItems] = useState([]);
  const [invited, setInvited] = useState([]);
  return (
    <>
      <Surface style={{ backgroundColor: theme.colors.primary }}>
        <Text
          variant="headlineSmall"
          style={{
            textAlign: "justify",
            margin: 10,
            color: "#FFFFFF",
          }}
        >
          Invite Students
        </Text>
      </Surface>
      <StudentList
        students={students}
        tripStudents={tripStudents}
        consentInfo={consentInfo}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        />
      <SendStudentInvites
        checkedItems={checkedItems}
        invited={invited}
        students={students}
        tripStudents={tripStudents}
        setCheckedItems={setCheckedItems}
        setModalVisible={setModalVisible}
        setTripStudents={setTripStudents}
        />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Invites Sent!</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeText: {
    color: "#2196F3",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});
