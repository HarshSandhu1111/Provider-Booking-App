import React, { useState } from "react";
import axios from "axios";
import './ProviderSignup.css';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';

function ProviderSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [city, setcity] = useState("");
  const [serviceType,setservicetype]=useState("");

    const [userLocation, setUserLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default location
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const res = await axios.post("http://localhost:5000/proffesionals/signup",
        { name, email, password, location,city,serviceType },
        { withCredentials: true }
      );

      console.log(res.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data || "Signup failed");
    }
  }
  const GOOGLE_MAPS_API_KEY = "AIzaSyC0xHQ3SSduD4EE2uGkZ4awZzzRzcMwodE"; 

  

  // Get user's current location
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocation(`${latitude},${longitude}`); // Set city name in location field
        },
        (error) => {
          console.log("Error fetching location:", error);
          alert("Unable to fetch location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">city</label>
          <input
            type="city"
            id="ciity"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            placeholder="Enter your city"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="servicetype">serviceType</label>
          <input
            type="text"
            id="service"
            value={serviceType}
            onChange={(e) => setservicetype(e.target.value)}
            placeholder="Enter your Proffesion"
            required
          />
        </div>

        {/* Location Button */}
        <div className="form-group">
          <label>Location</label>
          <button type="button" onClick={handleLocation}>Get My Location</button>
          <input
            type="text"
            value={location}
            placeholder="Your city will appear here"
            readOnly
          />
        </div>

        {/* Google Map with Draggable Marker */}
        <LoadScript googleMapsApiKey={"AIzaSyC0xHQ3SSduD4EE2uGkZ4awZzzRzcMwodE"}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={userLocation}
            zoom={12}
          >
            <Marker
  position={userLocation}
  draggable={true}
  onDragEnd={(event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setUserLocation({ lat: newLat, lng: newLng });
    setLocation(`${newLat},${newLng}`);
  }}
/>

          </GoogleMap>
        </LoadScript>

<button>submit</button>


      </form>
    </div>
  );
}

export default ProviderSignup;
