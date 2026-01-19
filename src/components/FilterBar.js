import { View, Text, TextInput, Pressable, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function FilterBar({
  make,
  model,
  makes,
  models,
  minBid,
  showFavourites,
  onChangeMake,
  onChangeModel,
  onChangeMinBid,
  onToggleFavourites,
  onResetFilters,
}) {
  return (
    <View style={{ marginBottom: 15 }}>
      {/* Make dropdown */}
      <Text>Make</Text>
      <Picker selectedValue={make} onValueChange={onChangeMake}>
        <Picker.Item label="All makes" value="" />
        {makes.map((m) => (
          <Picker.Item key={m} label={m} value={m} />
        ))}
      </Picker>

      {/* Model dropdown */}
      <Text>Model</Text>
      <Picker selectedValue={model} onValueChange={onChangeModel}>
        <Picker.Item label="All models" value="" />
        {models.map((m) => (
          <Picker.Item key={m} label={m} value={m} />
        ))}
      </Picker>

      {/* Min bid input */}
      <Text>Minimum starting bid</Text>
      <TextInput
        placeholder="e.g. 15000"
        value={minBid}
        onChangeText={onChangeMinBid}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 8,
          marginVertical: 8,
        }}
      />

      {/* Show favourites switch */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 0,
        }}
      >
        <Text>Show favourites only</Text>
        <Switch
          value={showFavourites}
          onValueChange={onToggleFavourites}
        />
      </View>

      {/* Reset */}
      <Pressable onPress={onResetFilters}>
        <Text style={{ color: "red" }}>Reset filters</Text>
      </Pressable>
    </View>
  );
}
