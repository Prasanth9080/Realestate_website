import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import './Homepage.css';
import Slider from "react-slick";  // Import React Slick
import Footer from './Footer.js'

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/properties/') // Fetch data from API
      .then(response => {
        console.log("Fetched properties:", response.data); // Check API data
        setProperties(response.data);
        setFilteredProperties(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);


  // Define the settings object for the React Slick carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Change this number to show more/less images at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Handle search filtering
  const handleSearch = () => {
    const filtered = properties.filter(property => {
      return (
        (!searchLocation || property.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
        (!propertyType || property.property_type === propertyType) &&
        (!minPrice || property.price >= parseInt(minPrice)) &&
        (!maxPrice || property.price <= parseInt(maxPrice))
      );
    });
    console.log("Filtered properties:", filtered);
    setFilteredProperties(filtered);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <h1>Invest in Real Estate</h1>
        <p>1 SQFT at a time!</p>
      </section>

      <section className="search-filter">
        <h2>Search for Properties</h2>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">Property Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      <section className="featured-properties">
        <h2>Featured Properties</h2>
        <div className="row">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <div key={property.id} className="col-lg-3 col-md-4 col-sm-12 mb-4">
                <div className="property-card">
                  <img
                    src={property.image} // Ensure media files are served correctly
                    alt={property.title}
                    className="img-fluid"
                  />
                  <div className="property-card-content">
                    <h3>{property.title}</h3>
                    <p>{property.description}</p>
                    <p className="property-card-price">${property.price.toLocaleString()}</p>
                    <button className='bg-info'>View Details</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </section>

      <section className="featured-properties">
        <h2>Build Properties</h2>
        <h6>Properties below</h6>
        
        {/* Carousel */}
        <Slider {...settings}>
          {properties.length > 0 ? (
            properties.map(property => (
              <div key={property.id}>
                <div className="property-card">
                  <img
                    src={property.image}  // Make sure the image URL is correct
                    alt={property.title}
                    className="img-fluid"
                  />
                  <div className="property-card-content">
                    <h3>{property.title}</h3>
                    <p>{property.description}</p>
                    <p className="property-card-price">${property.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </Slider>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
