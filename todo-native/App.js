import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Header, Input, ListItem, Text } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const url = "http://192.168.43.12:8888/tasks";

const styles = StyleSheet.create({
  container: {
    width: "100vw",
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
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      setTasks(data);
    })();
  }, []);

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
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          leftComponent={<Ionicons name="menu" size={24} />}
          centerComponent={
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Todo Native
            </Text>
          }
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                setTasks(tasks.filter((task) => !task.done));
              }}
            >
              <Ionicons name="checkmark-done" size={24} />
            </TouchableOpacity>
          }
        />
        <View style={styles.form}>
          <Input
            placeholder="New Task"
            onChangeText={setText}
            value={text}
            ref={inputRef}
            onSubmitEditing={() => addTask()}
            rightIcon={
              <TouchableOpacity onPress={() => addTask()}>
                <Ionicons name="add" size={24} />
              </TouchableOpacity>
            }
          />
        </View>

        <View style={{ padding: 20 }}>
          {tasks
            .filter((item) => !item.done)
            .map((item) => {
              return (
                <ListItem key={item._id}>
                  <TouchableOpacity
                    onPress={() => {
                      setTasks(
                        tasks.map((task) => {
                          if (task._id === item._id) task.done = !task.done;
                          return task;
                        })
                      );
                    }}
                  >
                    <Ionicons name="square-outline" size={24} />
                  </TouchableOpacity>
                  <ListItem.Content>
                    <ListItem.Title>{item.subject}</ListItem.Title>
                  </ListItem.Content>
                  <TouchableOpacity
                    onPress={() => {
                      setTasks(tasks.filter((task) => task._id !== item._id));
                    }}
                  >
                    <Ionicons name="trash" size={24} />
                  </TouchableOpacity>
                </ListItem>
              );
            })}
        </View>

        <View style={{ padding: 20 }}>
          {tasks
            .filter((item) => item.done)
            .map((item) => {
              return (
                <ListItem key={item._id}>
                  <TouchableOpacity
                    onPress={() => {
                      setTasks(
                        tasks.map((task) => {
                          if (task._id === item._id) task.done = !task.done;
                          return task;
                        })
                      );
                    }}
                  >
                    <Ionicons name="checkmark" color="green" size={24} />
                  </TouchableOpacity>
                  <ListItem.Content>
                    <ListItem.Title>{item.subject}</ListItem.Title>
                  </ListItem.Content>
                  <TouchableOpacity
                    onPress={() => {
                      setTasks(tasks.filter((task) => task._id !== item._id));
                    }}
                  >
                    <Ionicons name="trash" size={24} />
                  </TouchableOpacity>
                </ListItem>
              );
            })}
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
