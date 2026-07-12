const getVehicleImage = (vehicle) => {
  let make = "";
  let model = "";
  let category = "";
  let year = "";

  if (vehicle && typeof vehicle === "object") {
    make = vehicle.make || "";
    model = vehicle.model || "";
    category = vehicle.category || "";
    year = vehicle.year || "";
  } else if (typeof vehicle === "string") {
    category = vehicle;
  }

  // Construct query: make + model + category + year
  const queryParts = [];
  if (make) queryParts.push(make);
  if (model) queryParts.push(model);
  if (category) queryParts.push(category);
  if (year) queryParts.push(year);

  const query = queryParts.join(" ").trim();

  // If we can construct a search query, use Unsplash Source
  if (query) {
    return `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(query)}`;
  }

  // Fallback to category-based static Unsplash images
  switch (category?.toLowerCase()) {
    case "suv":
      return "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80";

    case "sedan":
      return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80";

    case "hatchback":
      return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80";

    case "sports":
      return "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80";

    case "truck":
      return "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80";

    default:
      return "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80";
  }
};

export default getVehicleImage;