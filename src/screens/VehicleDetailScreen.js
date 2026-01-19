import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VehicleDetailScreen({ route }) {
  const vehicle = route?.params?.vehicle;
  const isFavourite = route?.params?.isFavourite;

  if (!vehicle) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No vehicle data available.</Text>
      </View>
    );
  }

  // Placeholder image gallery (static images for demo purposes)
  const images = [
    require("../../assets/placeholderCar.jpg"),
    require("../../assets/placeholderCar.jpg"),
    require("../../assets/placeholderCar.jpg"),
  ];

  return (
    <ScrollView
      style={{ padding: 20 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Image gallery */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={{
              width: 320,
              height: 200,
              borderRadius: 10,
              marginRight: 10,
              backgroundColor: "#eee",
            }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Title */}
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {vehicle.make} {vehicle.model}
      </Text>

      {/* Favourite status */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 8,
        }}
      >
        <Ionicons
          name={isFavourite ? "heart" : "heart-outline"}
          size={20}
          color={isFavourite ? "red" : "#555"}
          style={{ marginRight: 6 }}
        />
        <Text style={{ fontSize: 16 }}>
          {isFavourite ? "Favourite vehicle" : "Not favourite"}
        </Text>
      </View>

      {/* Vehicle overview */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 15 }}>
        Vehicle Overview
      </Text>
      <Text>Make: {vehicle.make}</Text>
      <Text>Model: {vehicle.model}</Text>
      <Text>Year: {vehicle.year}</Text>
      <Text>Mileage: {vehicle.mileage} km</Text>

      {/* Technical specs */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>
        Technical Specifications
      </Text>
      <Text>Engine size: {vehicle.engineSize}</Text>
      <Text>Fuel type: {vehicle.fuel}</Text>

      {/* Auction info */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>
        Auction Information
      </Text>
      <Text>Auction date: {vehicle.auctionDateTime}</Text>
      <Text>Starting bid: €{vehicle.startingBid}</Text>

      {/* Status / extras */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>
        Additional Information
      </Text>
      <Text>
        This vehicle is sold through an online auction. All information shown is
        provided for reference purposes only.
      </Text>

      {/* Description */}
      <Text style={{ marginTop: 20, color: "#555", lineHeight: 20 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </Text>
    </ScrollView>
  );
}
