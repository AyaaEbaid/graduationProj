// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// export default function GovernratesApi() {
//     const [governorate, setGovernorate] = useState()
//     async function getGovernratesApi() {
//         return  axios.get(`https://hanshatabhalak.runasp.net/api/Governorate?language=${i18n.language}`).then((data)=>{
//             console.log(data.data);
//             setGovernorate(data.data)
//         }).catch((error)=>{
//             console.log(error);
            
//         })
        
       
        
//     }
//     useEffect(() => {
//         getGovernratesApi
      
        
//       }, [])
//   return (
//     <>


//     </>
//   )
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

const GovernoratesComponent = () => {
  const [governorates, setGovernorates] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [governorateDetails, setGovernorateDetails] = useState(null);

  // Fetch all governorates
  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const response = await axios.get("https://hanshatabhalak.runasp.net/api/Governorate?language=en");
        setGovernorates(response.data["$values"]);
      } catch (error) {
        console.error("Error fetching governorates:", error);
      }
    };

    fetchGovernorates();
  }, []);

  // Fetch details of selected governorate by ID
  useEffect(() => {
    const fetchGovernorateDetails = async () => {
      if (!selectedId) return;

      try {
        const response = await axios.get(`https://hanshatabhalak.runasp.net/api/Governorate/${selectedId}?language=en`);
        setGovernorateDetails(response.data);
      } catch (error) {
        console.error("Error fetching governorate details:", error);
      }
    };

    fetchGovernorateDetails();
  }, [selectedId]);

  return (
    <div className="p-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">اختر محافظة:</label>
      <select
        className="w-full p-2 border rounded-md"
        onChange={(e) => setSelectedId(e.target.value)}
        value={selectedId}
      >
        <option value="">-- اختر محافظة --</option>
        {governorates?.map((gov) => (
          <option key={gov._id} value={gov._id}>
            {gov.name}
          </option>
        ))}
      </select>

      {governorateDetails && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2">تفاصيل المحافظة:</h2>
          <p><span className="font-medium">الاسم:</span> {governorateDetails.name}</p>
          {/* ضيف هنا أي تفاصيل تانية */}
        </div>
      )}
    </div>
  );
};

export default GovernoratesComponent;