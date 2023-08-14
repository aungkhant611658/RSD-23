import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRef, useState } from "react";

const styles = StyleSheet.create({
  container: {
    // width: 600,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#2196F3",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "#9bcff7",
    flexDirection: "row",
    padding: 20,
  },
  input: {
    fontSize: 18,
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "space-between",
    borderRadius: 4,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    {
      _id: 1,
      subject: "Milk",
      done: false,
    },
    {
      _id: 2,
      subject: "Apple",
      done: false,
    },
    {
      _id: 3,
      subject: "Banana",
      done: false,
    },
  ]);

  const [text, setText] = useState("");
  const inputRef = useRef();

  const addTask = () => {
    if (!text) return false;

    const _id = tasks.length > 0 ? tasks[tasks.length - 1]._id + 1 : 1;

    setTasks([
      ...tasks,
      {
        _id,
        subject: text,
        done: false,
      },
    ]);

    setText("");
    inputRef.current.focus();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Todo Native</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="+ New Task"
            placeholderTextColor="#888"
            onChangeText={setText}
            value={text}
            ref={inputRef}
            onSubmitEditing={() => addTask()}
          />
          <Button title="ADD" onPress={() => addTask()} />
        </View>
        <View style={{ padding: 20 }}>
          {tasks.map((item) => {
            return (
              <View key={item._id} style={styles.listItem}>
                <Text style={{ fontSize: 18 }}>{item.subject}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setTasks(tasks.filter((task) => task._id !== item._id));
                  }}
                >
                  <Text style={{ fontSize: 18, color: "brown" }}>Del</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
