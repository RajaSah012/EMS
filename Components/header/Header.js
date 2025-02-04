import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Drawer Icon */}
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={28} color="white" style={styles.icon} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Right Icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("LiveLocation")}>
            <MaterialIcons
              name="location-on"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <MaterialIcons
              name="notifications"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* + Icon */}
          <TouchableOpacity onPress={() => navigation.navigate("CompanyDetails")}>
            <MaterialIcons
              name="add"
              size={28}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1, // Ensure the header stays on top
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE", // Primary header color
    height: 60,
    paddingHorizontal: 10,
    marginTop: StatusBar.currentHeight || 0, // Adjust for status bar
    elevation: 4, // Shadow effect for Android
    shadowColor: "#000", // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "absolute", // Ensures it's at the top
    top: 0, // Aligns it to the top of the screen
    left: 0,
    right: 0,
  },
  icon: {
    marginHorizontal: 10,
  },
  title: {
    flex: 1, // Center the title
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
