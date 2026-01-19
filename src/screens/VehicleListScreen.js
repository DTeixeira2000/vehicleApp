import { useState, useEffect, useMemo } from "react";
import { View, FlatList, Text } from "react-native";

import vehiclesData from "../data/vehicles.json";
import VehicleCard from "../components/VehicleCard";
import FilterBar from "../components/FilterBar";

export default function VehicleListScreen({ navigation }) {
  // ─────────────────────────────
  // Filter state (controlled inputs)
  // ─────────────────────────────
  const [makeFilter, setMakeFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [minBidFilter, setMinBidFilter] = useState("");
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  // ─────────────────────────────
  // Favourite vehicles (index-based, initialized from static data)
  // ─────────────────────────────
  const [favourites, setFavourites] = useState(() =>
    vehiclesData
      .map((v, i) => (v.favourite ? i : null))
      .filter((v) => v !== null)
  );

  // ─────────────────────────────
  // Available MAKES (depends only on selected model)
  // Prevents dropdown options from locking
  // ─────────────────────────────
  const availableMakes = useMemo(() => {
    if (!modelFilter) {
      return [...new Set(vehiclesData.map((v) => v.make))];
    }

    return [
      ...new Set(
        vehiclesData.filter((v) => v.model === modelFilter).map((v) => v.make)
      ),
    ];
  }, [modelFilter]);

  // ─────────────────────────────
  // Available MODELS (depends only on selected make)
  // ─────────────────────────────
  const availableModels = useMemo(() => {
    if (!makeFilter) {
      return [...new Set(vehiclesData.map((v) => v.model))];
    }

    return [
      ...new Set(
        vehiclesData.filter((v) => v.make === makeFilter).map((v) => v.model)
      ),
    ];
  }, [makeFilter]);

  // ─────────────────────────────
  // Auto-reset invalid make selection
  // (e.g. model changed and current make no longer matches)
  // ─────────────────────────────
  useEffect(() => {
    if (makeFilter && !availableMakes.includes(makeFilter)) {
      setMakeFilter("");
    }
  }, [availableMakes]);

  // ─────────────────────────────
  // Auto-reset invalid model selection
  // ─────────────────────────────
  useEffect(() => {
    if (modelFilter && !availableModels.includes(modelFilter)) {
      setModelFilter("");
    }
  }, [availableModels]);

  // ─────────────────────────────
  // Final filtered vehicle list used for rendering
  // Applies all active filters and favourites
  // ─────────────────────────────
  const filteredVehicles = vehiclesData
    .map((vehicle, index) => ({ vehicle, index }))
    .filter(({ vehicle, index }) => {
      if (makeFilter && vehicle.make !== makeFilter) return false;
      if (modelFilter && vehicle.model !== modelFilter) return false;
      if (minBidFilter && vehicle.startingBid < Number(minBidFilter))
        return false;
      if (showFavouritesOnly && !favourites.includes(index)) return false;
      return true;
    });

  // ─────────────────────────────
  // Reset all filters to default state
  // ─────────────────────────────
  const resetFilters = () => {
    setMakeFilter("");
    setModelFilter("");
    setMinBidFilter("");
    setShowFavouritesOnly(false);
  };

  // ─────────────────────────────
  // Toggle favourite state for a vehicle
  // ─────────────────────────────
  const toggleFavourite = (index) => {
    setFavourites((prev) =>
      prev.includes(index) ? prev.filter((x) => x !== index) : [...prev, index]
    );
  };

  // ─────────────────────────────
  // Global timer used to update auction countdowns
  // ─────────────────────────────
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 5000);
    return () => clearInterval(interval);
  }, []);

  // ─────────────────────────────
  // Get auction state from date difference
  // ─────────────────────────────
  const getTimeUntilAuction = (auctionDateTime) => {
    const formatted = auctionDateTime.replace(/\//g, "-").replace(" ", "T");
    const auctionDate = new Date(formatted);

    if (isNaN(auctionDate.getTime())) return "Invalid date";

    const diffMs = auctionDate - now;
    const diffSeconds = Math.floor(diffMs / 1000);

    // Countdown before auction starts
    if (diffSeconds > 0) {
      const days = Math.floor(diffSeconds / (3600 * 24));
      const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);
      const seconds = diffSeconds % 60;

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Live window (first 5 minutes after start)
    if (Math.abs(diffSeconds) <= 300) {
      return "Auction live";
    }

    // Auction has ended
    return "Auction ended";
  };

  // ─────────────────────────────
  // Empty state shown when no vehicles match filters
  // ─────────────────────────────
  const EmptyListComponent = () => (
    <View style={{ marginTop: 40, alignItems: "center" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        No vehicles found
      </Text>
      <Text style={{ marginTop: 8, color: "#666", textAlign: "center" }}>
        Try adjusting or resetting your filters.
      </Text>
    </View>
  );

  // ─────────────────────────────
  // Render
  // ─────────────────────────────
  return (
    <FlatList
      data={filteredVehicles}
      keyExtractor={(item) => item.index.toString()}
      contentContainerStyle={{ padding: 20 }}
      ListHeaderComponent={
        <>
          <FilterBar
            make={makeFilter}
            model={modelFilter}
            makes={availableMakes}
            models={availableModels}
            minBid={minBidFilter}
            showFavourites={showFavouritesOnly}
            onChangeMake={setMakeFilter}
            onChangeModel={setModelFilter}
            onChangeMinBid={setMinBidFilter}
            onToggleFavourites={() =>
              setShowFavouritesOnly((prev) => !prev)
            }
            onResetFilters={resetFilters}
          />

          <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: "600" }}>
            {filteredVehicles.length}{" "}
            {filteredVehicles.length === 1 ? "vehicle" : "vehicles"} found
          </Text>
        </>
      }
      renderItem={({ item }) => (
        <VehicleCard
          vehicle={item.vehicle}
          isFavourite={favourites.includes(item.index)}
          onToggleFavourite={() => toggleFavourite(item.index)}
          onPress={() =>
            navigation.navigate("VehicleDetails", {
              vehicle: item.vehicle,
              isFavourite: favourites.includes(item.index),
            })
          }
          auctionTime={getTimeUntilAuction(item.vehicle.auctionDateTime)}
        />
      )}
      ListEmptyComponent={EmptyListComponent}
    />
  );
}
