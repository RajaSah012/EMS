import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Alert, Image, StatusBar,Text } from "react-native"

const Header = ({title}) => {
    const navigation =useNavigation()
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="add" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("LiveLocation")}>
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
        </TouchableOpacity> */}
        <Text style={{fontSize:20}}>{title}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      backgroundColor: "#880808",
      height:55,
      marginTop:StatusBar.currentHeight
    },
    icon: {
      marginLeft: 20,
    },
    drawerHeader: {
      backgroundColor: "#880808",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 20,
    },
    logo: {
      width: 70,
      height: 70,
      borderRadius: 60,
      marginBottom: 10,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginHorizontal: 10,
      marginVertical: 5,
      elevation: 4, // Shadow for Android
      shadowColor: "#000", // iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    sectionHeading: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000",
    },
    drawerLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333",
    },
    drawerItem: {
      marginLeft: 0,
      borderBottomWidth: 0.5,
      borderBottomColor: "#ddd",
    },
    icon: {
      marginRight: 10,
    },
    username: {
      fontSize: 18,
      color: "white",
      marginTop: 10,
    },
    drawerContent: {
      flex: 1,
      marginTop: 30,
      marginLeft: 10,
    },
  });

  export default Header;