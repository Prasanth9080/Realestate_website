import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/bundle'; // Optional for additional styles
import Navbar from './navbar';
import axios from 'axios';
import './Homepage.css';
import Footer from './Footer';


const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/properties/')
      .then((response) => {
        setProperties(response.data);
        setFilteredProperties(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filtered = properties.filter((property) => {
      return (
        (!searchLocation || property.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
        (!propertyType || property.property_type === propertyType) &&
        (!minPrice || property.price >= parseInt(minPrice)) &&
        (!maxPrice || property.price <= parseInt(maxPrice))
      );
    });
    setFilteredProperties(filtered);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <h1>Find Your Dream Property</h1>
        <p>Browse through our collection of properties for sale or rent.</p>
      </section>

      <section className="search-filter">
        <h2>Search Properties</h2>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className='text-secondary'>
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
            filteredProperties.map((property) => (
              <div key={property.id} className="col-lg-3 col-md-4 col-sm-12 mb-4">
                <div className="property-card">
                  <img
                    src={property.image}
                    className="img-fluid"
                  /> 
                  <div className="property-card-content">
                    <h3>{property.title}</h3>
                    <p>{property.description}</p>
                    <p className="property-card-price py-2">${property.price.toLocaleString()}</p>
                    <button className="bg-info col-lg-12 mx-auto">View Details</button>
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
        <div className="container py-4 px-4 justify-content-center">
          <Swiper
            grabCursor={true}
            slidesPerView={3}
            spaceBetween={30}
            className="mySwiper"
          >
            {properties.map((property) => (
              <SwiperSlide key={property.id}>
                <div className="property-card-slider">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="img-fluid slider-image"
                  />
                  <div className="slider-content">
                    <h5>{property.title}</h5>
                    <p>${property.price.toLocaleString()}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
