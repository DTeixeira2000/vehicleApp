import React, { memo } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function VehicleCard({
  vehicle,
  isFavourite,
  onToggleFavourite,
  onPress,
  auctionTime,
}) {
  const isLive = auctionTime === "Auction live";
  const isEnded = auctionTime === "Auction ended";

  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: 12,
        backgroundColor: "#fff",
        marginBottom: 16,
        overflow: "hidden",
        elevation: 2, // Android shadow
      }}
    >
      {/* Image container */}
      <View style={{ position: "relative" }}>
        <Image
          source={require("../../assets/placeholderCar.jpg")}
          style={{
            width: "100%",
            height: 160,
          }}
          resizeMode="cover"
        />

        {/* Favourite button */}
        <Pressable
          onPress={onToggleFavourite}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "#fff",
            borderRadius: 20,
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            elevation: 3,
          }}
          hitSlop={10}
        >
          <Ionicons
            name={isFavourite ? "heart" : "heart-outline"}
            size={20}
            color={isFavourite ? "red" : "#555"}
          />
        </Pressable>
      </View>

      {/* Content */}
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {vehicle.make} {vehicle.model}
        </Text>

        <Text style={{ color: "#555", marginTop: 4 }}>
          Starting bid: €{vehicle.startingBid}
        </Text>

        {/* Auction badge */}
        <View
          style={{
            marginTop: 8,
            alignSelf: "flex-start",
            backgroundColor: isLive ? "green" : isEnded ? "#999" : "#f2f2f2",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: isLive ? "white" : isEnded ? "white" : "#333",
              fontWeight: isLive ? "bold" : "normal",
            }}
          >
            {isLive || isEnded ? auctionTime : `Auction in ${auctionTime}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default memo(VehicleCard);
