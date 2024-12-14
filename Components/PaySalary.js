import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { myAxios } from '../services/helper';

const PaySalary = ({ route, navigation }) => {
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
    fname: '',
    salary: '',
    address: '',
    jod: '',
    category: '',
    gender: '',
    marritalStatus: '',
    status: '',
    site: '',
    work: '',
  });

  useEffect(() => {
    setEmployee({
      name: '',
      email: '',
      mobile: '',
      dob: '',
      password: '',
      fname: '',
      salary: '',
      address: '',
      jod: '',
      category: '',
      gender: '',
      marritalStatus: '',
      status: '',
      site: '',
      work: '',
    });

    myAxios
      .get('/api/employee/' + employeeId)
      .then((result) => {
        setEmployee({
          name: result.data.name,
          email: result.data.email,
          mobile: result.data.mobile,
          dob: result.data.dob,
          password: result.data.password,
          fname: result.data.fname,
          salary: result.data.salary,
          address: result.data.address,
          jod: result.data.jod,
          category: result.data.category,
          gender: result.data.gender,
          marritalStatus: result.data.marritalStatus,
          status: result.data.status,
          site: result.data.site,
          work: result.data.work,
        });
      })
      .catch((err) => console.log(err));
  }, [employeeId]);

  const handleSubmit = () => {
    myAxios
      .put('/api/employee/' + employeeId, employee)
      .then((result) => {
        if (result.data) {
          Alert.alert('Success', 'Salary details updated successfully!', [
            { text: 'OK', onPress: () => navigation.navigate('kycVerification') }
          ]);
        } else {
          Alert.alert('Error', result.data.Error || 'An error occurred!');
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'An error occurred while updating!');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Pay Salary to {employee.name.toUpperCase()} (ID: {employeeId})</Text>

      <View style={styles.card}>
        <Text style={styles.label}>CTC ₹</Text>
        <TextInput
          style={styles.input}
          placeholder="CTC"
          value={(employee.salary * 12).toString()}
          onChangeText={(value) => setEmployee({ ...employee, salary: value })}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Monthly Salary ₹</Text>
        <TextInput
          style={styles.input}
          placeholder="Monthly Salary"
          value={employee.salary.toString()}
          onChangeText={(value) => setEmployee({ ...employee, salary: value })}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Weekly Salary ₹</Text>
        <TextInput
          style={styles.input}
          placeholder="Weekly Salary"
          value={((employee.salary / 30) * 7).toString()}
          onChangeText={(value) => setEmployee({ ...employee, salary: value })}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Daily Salary ₹</Text>
        <TextInput
          style={styles.input}
          placeholder="Daily Salary"
          value={(employee.salary / 30).toString()}
          onChangeText={(value) => setEmployee({ ...employee, salary: value })}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Professional Tax ₹ (PF)</Text>
        <TextInput style={styles.input} placeholder="Professional Tax (PF)" />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Employer PF ₹</Text>
        <TextInput style={styles.input} placeholder="Employer PF" />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Employee Insurance ₹</Text>
        <TextInput style={styles.input} placeholder="Employee Insurance" />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Total Monthly Deduction: ₹4,500</Text>
        <Text style={styles.resultText}>Total Annual Deduction: ₹{4500 * 12}</Text>
        <Text style={styles.resultText}>Net Take Home Monthly: ₹{employee.salary}</Text>
        <Text style={styles.resultText}>Net Take Home Annually: ₹{employee.salary * 12}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFDEE9',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
});

export default PaySalary;
