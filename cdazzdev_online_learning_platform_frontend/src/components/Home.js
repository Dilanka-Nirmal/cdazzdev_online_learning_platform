import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Welcome to Our Online Learning Platform</h1>
        <p>Where learning never stops!</p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h2>Featured Courses</h2>
          <div className="card">
            <img src="https://imgur.com/FssKvyi.jpeg" alt="Course 1" />
            <div className="card-body">
              <h5 className="card-title">Data Structures & Algorithms</h5>
              <p className="card-text">Stack, Queue, Tree and many more...</p>
              <a href="#" className="btn btn-primary">Enroll</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h2>Popular Instructors</h2>
          <div className="card">
            <img src="https://imgur.com/kuX7gSg.jpeg" alt="Instructor 1" />
            <div className="card-body">
              <h5 className="card-title">Mr. Mosh Hamedani</h5>
              <p className="card-text">Instructor - FACULTY OF COMPUTING | SOFTWARE ENGINEERING</p>
              <a href="#" className="btn btn-primary">View Profile</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h2>Latest News</h2>
          <div className="card">
            <img src="https://imgur.com/EniFRR0.jpeg" alt="News 1" />
            <div className="card-body">
              <h5 className="card-title">SLIIT was at the EDEX Expo 2024</h5>
              <p className="card-text"> SLIIT was at the EDEX Expo 2024, Sri Lanka’s premier and largest education exhibition and job fair which was held from 09th – 11th February 2024 at SLECC, Colombo 10. The event provided a vibrant platform for students, job seekers, and knowledge enthusiasts to explore diverse educational paths.</p>
              <a href="#" className="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
