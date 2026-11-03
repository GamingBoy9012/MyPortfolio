import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <h1>Welcome to My Portfolio</h1>

      <h2>Software Engineering Technology - AI Student</h2>

      <p>
        Welcome to my personal portfolio. This website showcases my
        education, projects, technical skills, and services.
      </p>

      <p>
        My goal is to continue developing my programming and software
        development skills while creating useful and meaningful applications.
      </p>

      <Link to="/about" className="button">
        Learn More About Me
      </Link>
    </div>
  );
}

export default Home;