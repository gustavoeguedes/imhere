import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export default function Home() {
  const [valueInput, setValueInput] = useState("");
  const [participants, setParticipants] = useState<string[]>([
    "Ju leitão",
    "Vitor boiolinha",
    "Raudani Gay",
    "Diego",
    "Mayk",
    "Vinicius",
    "Guilherme",
    "Rafa",
    "Rafaela",
    "João",
    "Maria",
    "José",
    "Pedro",
    "Paulo",
    "Ana",
    "Lucas",
    "Gabriel",
    "Julia",
  ]);

  function handleParticipantAdd() {
    if (participants.includes(valueInput)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com esse nome."
      );
    }

    if (valueInput === "") {
      return Alert.alert(
        "Campo vazio",
        "Você precisa informar um nome para o participante."
      );
    }

    setParticipants((prevState) => [...prevState, valueInput]);
    setValueInput("");
  }
  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          setParticipants((prevState) => {
            return prevState.filter((participant) => participant !== name);
          });
          Alert.alert("Deletado!");
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>
      <View style={styles.form}>
        <TextInput
          value={valueInput}
          onChangeText={setValueInput}
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </View>
  );
}
