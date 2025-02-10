import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import axios from "axios";

const Region = () => {
  const [regions, setRegions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRegion, setCurrentRegion] = useState({ name: "", latitude: "", longitude: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRegionId, setEditRegionId] = useState(null);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/region/regions");
      setRegions(response.data);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const openAddRegionModal = () => {
    setCurrentRegion({ name: "", latitude: "", longitude: "" });
    setIsEditMode(false);
    setEditRegionId(null);
    setModalVisible(true);
  };

  const openEditRegionModal = (id) => {
    const regionToEdit = regions.find((region) => region.id === id);
    if (regionToEdit) {
      setCurrentRegion(regionToEdit);
      setIsEditMode(true);
      setEditRegionId(id);
      setModalVisible(true);
    }
  };

  const saveRegion = async () => {
    if (isEditMode) {
      try {
        await axios.put(`http://localhost:5000/api/region/regions/${editRegionId}`, currentRegion);
        fetchRegions();
      } catch (error) {
        console.error("Error updating region:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/api/region/regions", currentRegion);
        fetchRegions();
      } catch (error) {
        console.error("Error adding region:", error);
      }
    }
    setModalVisible(false);
    setCurrentRegion({ name: "", latitude: "", longitude: "" });
  };

  const deleteRegion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/region/regions/${id}`);
      fetchRegions();
    } catch (error) {
      console.error("Error deleting region:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div style={{ padding: "25px", flexGrow: 1, backgroundColor: "#f9fafb" }}>
        <div className="p-6 bg-gray-50 min-h-screen w-[159vh]">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Region List</h1>
            <div className="flex justify-end mb-4">
              <button
                onClick={openAddRegionModal}
                className="bg-slate-600 text-white px-6 py-2 rounded shadow hover:shadow-lg transition duration-300"
              >
                Add Region
              </button>
            </div>
          </div>
          <table className="w-full border-collapse bg-white rounded shadow-lg">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="border-b px-6 py-3 text-left">ID</th>
                <th className="border-b px-6 py-3 text-left">Name</th>
                <th className="border-b px-6 py-3 text-left">Latitude</th>
                <th className="border-b px-6 py-3 text-left">Longitude</th>
                <th className="border-b px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {regions?.map((region) => (
                <tr key={region.id} className="hover:bg-gray-100">
                  <td className="border-b px-6 py-3 w-24">{region.id}</td>
                  <td className="border-b px-6 py-3">{region.name}</td>
                  <td className="border-b px-6 py-3">{region.latitude}</td>
                  <td className="border-b px-6 py-3">{region.longitude}</td>
                  <td className="border-b px-6 py-3 h-full flex gap-4">
                    <button
                      onClick={() => openEditRegionModal(region.id)}
                      className="text-slate-600 hover:underline"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => deleteRegion(region.id)}
                      className="hover:underline text-red-500"
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">
                  {isEditMode ? "Edit Region" : "Add Region"}
                </h2>
                <label className="block mb-2 font-medium">Region Name</label>
                <input
                  type="text"
                  value={currentRegion.name}
                  onChange={(e) =>
                    setCurrentRegion({ ...currentRegion, name: e.target.value })
                  }
                  className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                  placeholder="Enter Region name"
                />
                <label className="block mb-2 font-medium">Latitude</label>
                <input
                  type="text"
                  value={currentRegion.latitude}
                  onChange={(e) =>
                    setCurrentRegion({ ...currentRegion, latitude: e.target.value })
                  }
                  className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                  placeholder="Enter Latitude"
                />
                <label className="block mb-2 font-medium">Longitude</label>
                <input
                  type="text"
                  value={currentRegion.longitude}
                  onChange={(e) =>
                    setCurrentRegion({ ...currentRegion, longitude: e.target.value })
                  }
                  className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                  placeholder="Enter Longitude"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setModalVisible(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveRegion}
                    className="bg-slate-600 text-white px-4 py-2 rounded shadow hover:shadow-lg transition duration-300"
                  >
                    Save
                  </button>
                </div>
                <button
                  onClick={() => setModalVisible(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Region;
