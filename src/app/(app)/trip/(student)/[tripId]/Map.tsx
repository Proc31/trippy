import * as React from "react";
import * as Location from "expo-location";
import { Surface, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Loading from "@/components/global/Loading";
import {
  FAB,
  Modal,
  Portal,
  List,
  Button,
  IconButton,
} from "react-native-paper";
import { useGlobalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { getTripMarkers } from "@/utils/utils";

const LATITUDE_DELTA = 0;
const LONGITUDE_DELTA = 0.01;
const CAMERA_SPEED = 3000;

const containerStyle = { backgroundColor: "white", padding: 20 };

export default function Map() {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);

  const mapRef = React.useRef(null);

  const { tripId } = useGlobalSearchParams();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const theme = useTheme();

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      const region = {
        latitude: parseFloat(location.coords.latitude),
        longitude: parseFloat(location.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      setLocation(region);
    })();
    refreshMarkers();
    setIsLoading(false);
  }, []);

  const refreshMarkers = async () => {
    const markers = await getTripMarkers(tripId);
    for (const thing in markers) {
      setMarkers((prev) => {
        return [...prev, markers[thing]];
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
          Useful locations
        </Text>
      </Surface>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={location}
          showsUserLocation
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                title={marker.title}
                coordinate={marker.coordinate}
                description={marker.description}
              ></Marker>
            );
          })}
        </MapView>
        <FAB
          icon="map-marker"
          style={styles.fab}
          onPress={showModal}
          mode="elevated"
          size="small"
          theme={{
            colors: {
              primaryContainer: "white",
              onPrimaryContainer: "green",
            },
          }}
        />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View>
              <ScrollView>
                {markers.map((marker) => {
                  return (
                    <List.Item
                      key={marker.id}
                      title={marker.title}
                      description={marker.description}
                      right={() => (
                        <IconButton
                          icon="map-marker"
                          size={32}
                          iconColor="green"
                          onPress={() => {
                            hideModal();
                            mapRef.current.animateCamera(
                              {
                                center: marker.coordinate,
                                zoom: 17,
                              },
                              CAMERA_SPEED
                            );
                          }}
                        />
                      )}
                    ></List.Item>
                  );
                })}
              </ScrollView>
              <Button onPress={hideModal}>Close Window</Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
    zIndex: 10,
  },
});
