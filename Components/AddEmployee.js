import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddEmployee = () => {
  const initialEmployeeState = {
    name: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    fname: "",
    salary: "",
    address: "",
    jod: "",
    category: "",
    gender: "",
    marritalStatus: "",
    status: "",
    site: "",
    work: "",
    image: null,
  };

  const [employee, setEmployee] = useState(initialEmployeeState);
  const [categories, setCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState({ dob: false, jod: false });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get("https://mohitbyproject-production.up.railway.app/api/category/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setCategories(response.data);
        } else {
          Alert.alert("Error", response.data.Error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userData", JSON.stringify(employee));
    if (employee.image) {
      const localUri = employee.image.uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("file", {
        uri: localUri,
        name: filename,
        type,
      });
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post("https://mohitbyproject-production.up.railway.app/api/employee/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setEmployee(initialEmployeeState);  // Reset the form
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", response.data.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEmployee({ ...employee, image: result.assets[0] });
    }
  };

  const handleDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || employee[field];
    setShowDatePicker({ ...showDatePicker, [field]: false });
    setEmployee({ ...employee, [field]: currentDate.toISOString().split('T')[0] });
  };

  const showDatePickerModal = (field) => {
    setShowDatePicker({ ...showDatePicker, [field]: true });
  };

  const marritalStatuses = ["Married", "Unmarried", "Divorced"];
  const statuses = [
    "Current",
    "Ex-Employee",
    "New Joining",
    "Transferred In",
    "Transferred Out",
    "Exited Employee",
  ];
  const sites = ["New Delhi", "Mumbai", "Bangalore", "Patna", "Kolkata", "Pune"];
  const works = ["Permanent", "Full Time", "Part Time", "Contract Basis"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Employee</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={(value) =>
            setEmployee({ ...employee, name: value })
          }
          value={employee.name}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          autoComplete="off"
          onChangeText={(value) =>
            setEmployee({ ...employee, email: value })
          }
          value={employee.email}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mobile No.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile No."
          keyboardType="phone-pad"
          onChangeText={(value) =>
            setEmployee({ ...employee, mobile: value })
          }
          value={employee.mobile}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.datePickerWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Select Date of Birth"
            value={employee.dob}
            editable={false}
          />
          <TouchableOpacity onPress={() => showDatePickerModal('dob')}>
            <Ionicons name="calendar" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {showDatePicker.dob && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'dob')}
          />
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={(value) =>
            setEmployee({ ...employee, password: value })
          }
          value={employee.password}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Father's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Father's Name"
          onChangeText={(value) =>
            setEmployee({ ...employee, fname: value })
          }
          value={employee.fname}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Salary Monthly</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Monthly Salary"
          keyboardType="numeric"
          autoComplete="off"
          onChangeText={(value) =>
            setEmployee({ ...employee, salary: value })
          }
          value={employee.salary}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          autoComplete="off"
          onChangeText={(value) =>
            setEmployee({ ...employee, address: value })
          }
          value={employee.address}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date of Joining</Text>
        <View style={styles.datePickerWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Select Date of Joining"
            value={employee.jod}
            editable={false}
          />
          <TouchableOpacity onPress={() => showDatePickerModal('jod')}>
            <Ionicons name="calendar" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {showDatePicker.jod && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'jod')}
          />
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Category / Department</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={employee.category}
            onValueChange={(value) =>
              setEmployee({ ...employee, category: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((c) => (
              <Picker.Item key={c.categoryId} label={c.categoryName} value={c.categoryName} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              employee.gender === "male" && styles.selectedGenderButton,
            ]}
            onPress={() => setEmployee({ ...employee, gender: "male" })}
          >
            <Text style={styles.genderButtonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              employee.gender === "female" && styles.selectedGenderButton,
            ]}
            onPress={() => setEmployee({ ...employee, gender: "female" })}
          >
            <Text style={styles.genderButtonText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              employee.gender === "trans" && styles.selectedGenderButton,
            ]}
            onPress={() => setEmployee({ ...employee, gender: "trans" })}
          >
            <Text style={styles.genderButtonText}>Trans</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Marital Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={employee.marritalStatus}
            onValueChange={(value) =>
              setEmployee({ ...employee, marritalStatus: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Marital Status" value="" />
            {marritalStatuses.map((status) => (
              <Picker.Item key={status} label={status} value={status} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Employee Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={employee.status}
            onValueChange={(value) =>
              setEmployee({ ...employee, status: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Employee Status" value="" />
            {statuses.map((status) => (
              <Picker.Item key={status} label={status} value={status} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Site</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={employee.site}
            onValueChange={(value) =>
              setEmployee({ ...employee, site: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Site" value="" />
            {sites.map((site) => (
              <Picker.Item key={site} label={site} value={site} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Type of Work</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={employee.work}
            onValueChange={(value) =>
              setEmployee({ ...employee, work: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Type of Work" value="" />
            {works.map((work) => (
              <Picker.Item key={work} label={work} value={work} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Upload Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Choose Image</Text>
        </TouchableOpacity>
        {employee.image && (
          <Image source={{ uri: employee.image.uri }} style={styles.imagePreview} />
        )}
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  datePickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  genderButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedGenderButton: {
    backgroundColor: "#007bff",
  },
  imagePicker: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default AddEmployee;
