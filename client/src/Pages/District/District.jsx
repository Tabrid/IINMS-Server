import { useState, useEffect } from "react";

import { FaPen } from "react-icons/fa"; 
import { BiTrash } from "react-icons/bi";
import axios from 'axios'; // Add axios for API requests

const District = () => {
    const [districts, setDistricts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentDistrict, setCurrentDistrict] = useState({ name: "", latitude: "", longitude: "" });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editDistrictId, setEditDistrictId] = useState(null);

    // Fetch all districts on component mount
    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/district/districts'); // Adjust API endpoint as needed
            setDistricts(response.data);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const openAddDistrictModal = () => {
        setCurrentDistrict({ name: "", latitude: "", longitude: "" });
        setIsEditMode(false);
        setEditDistrictId(null);
        setModalVisible(true);
    };

    const openEditDistrictModal = (id) => {
        const districtToEdit = districts.find((district) => district.id === id);
        if (districtToEdit) {
            setCurrentDistrict(districtToEdit);
            setIsEditMode(true);
            setEditDistrictId(id);
            setModalVisible(true);
        }
    };

    const saveDistrict = async () => {
        if (isEditMode) {
            // Update existing district
            try {
                await axios.put(`http://localhost:5000/api/district/districts/${editDistrictId}`, currentDistrict);
                fetchDistricts(); // Refresh districts list
            } catch (error) {
                console.error("Error updating district:", error);
            }
        } else {
            // Add new district
            try {
                await axios.post('http://localhost:5000/api/district/districts', currentDistrict);
                fetchDistricts(); // Refresh districts list
            } catch (error) {
                console.error("Error adding district:", error);
            }
        }
        setModalVisible(false);
        setCurrentDistrict({ name: "", latitude: "", longitude: "" });
    };

    const deleteDistrict = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/district/districts/${id}`);
            fetchDistricts(); // Refresh districts list
        } catch (error) {
            console.error("Error deleting district:", error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            {/* Main Content */}
            <div
                style={{
                    padding: "25px",
                    flexGrow: 1,
                    backgroundColor: "#f9fafb",
                }}
            >
                <div className="p-6 bg-gray-50 min-h-screen w-[159vh]">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6 text-center text-black">
                            District List
                        </h1>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={openAddDistrictModal}
                                className="bg-slate-600 text-white px-6 py-2 rounded shadow hover:shadow-lg transition duration-300"
                            >
                                Add District
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
                            {districts?.map((district) => (
                                <tr key={district.id} className="hover:bg-gray-100">
                                    <td className="border-b px-6 py-3 w-24">{district.id}</td>
                                    <td className="border-b px-6 py-3">{district.name}</td>
                                    <td className="border-b px-6 py-3">{district.latitude}</td>
                                    <td className="border-b px-6 py-3">{district.longitude}</td>
                                    <td className="border-b px-6 py-3 h-full flex gap-4">
                                        <button
                                            onClick={() => openEditDistrictModal(district.id)}
                                            className="text-slate-600 hover:underline"
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            onClick={() => deleteDistrict(district.id)}
                                            className="hover:underline text-red-500"
                                        >
                                            <BiTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal */}
                    {modalVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
                                <h2 className="text-2xl font-bold mb-4 text-center text-black">
                                    {isEditMode ? "Edit District" : "Add District"}
                                </h2>
                                <label className="block mb-2 font-medium">District Name</label>
                                <input
                                    type="text"
                                    value={currentDistrict.name}
                                    onChange={(e) => setCurrentDistrict({ ...currentDistrict, name: e.target.value })}
                                    className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                                    placeholder="Enter District name"
                                />
                                <label className="block mb-2 font-medium">Latitude</label>
                                <input
                                    type="text"
                                    value={currentDistrict.latitude}
                                    onChange={(e) => setCurrentDistrict({ ...currentDistrict, latitude: e.target.value })}
                                    className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2"
                                    placeholder="Enter Latitude"
                                />
                                <label className="block mb-2 font-medium">Longitude</label>
                                <input
                                    type="text"
                                    value={currentDistrict.longitude}
                                    onChange={(e) => setCurrentDistrict({ ...currentDistrict, longitude: e.target.value })}
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
                                        onClick={saveDistrict}
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

export default District;
