import React from 'react';
import './About.css';


const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4 text-black">About Us</h1>
          <p className="lead mt-3 text-black">
            We are passionate about delivering exceptional experiences and services.
          </p>
        </div>
      </section>

      <section className="our-mission py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Our Mission</h2>
          <p>
            Our mission is to provide high-quality solutions to our customers. We focus on 
            innovation, customer satisfaction, and excellence in everything we do.
            Founded in 2020, our company has consistently focused on providing top-notch 
            solutions to meet the evolving needs of our customers. Our team is composed of 
            dedicated professionals who strive to innovate and exceed expectations in 
            everything we do. From the initial stages of planning to the final execution, 
            we ensure quality, transparency, and customer satisfaction at every step.
          </p>
        </div>
      </section>

      <section className="our-team py-5">
        <div className="container">
          <h2 className="text-center mb-4">Meet the Team</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 text-center">
              <img
                src="/assets/images/profile-icon-design-free-vector.jpg" // Replace with real image URL or dynamic path
                alt="Team Member 1"
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h5>John Doe</h5>
              <p>CEO & Founder</p>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 text-center">
              <img
                src="/assets/images/profile-icon-design-free-vector.jpg"
                alt="Team Member 2"
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h5>Jane Smith</h5>
              <p>CTO</p>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 text-center">
              <img
                src="/assets/images/profile-icon-design-free-vector.jpg"
                alt="Team Member 3"
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h5>Emily Johnson</h5>
              <p>Marketing Head</p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Our Values</h2>
          <div className="row">
            <div className="col-md-4">
              <h5>Integrity</h5>
              <p>We uphold the highest standards of integrity in all our actions.</p>
            </div>
            <div className="col-md-4">
              <h5>Innovation</h5>
              <p>We pursue growth and learning to innovate and lead in our industry.</p>
            </div>
            <div className="col-md-4">
              <h5>Excellence</h5>
              <p>We deliver outstanding results and exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-info py-5">
        <div className="container text-center">
          <h2>Get in Touch</h2>
          <p className="mt-3">
            Contact us at <a href="mailto:contact@example.com">phoenixmarketing@gmail.com</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
