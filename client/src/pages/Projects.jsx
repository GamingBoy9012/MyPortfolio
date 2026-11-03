function Projects() {
  return (
    <div className="page">
      <h1>My Projects</h1>

      <div className="projects">

        <div className="project-card">
          <img src="/project1.png" alt="Cloud Kitchen Database" />

          <h2>Cloud Kitchen Database</h2>

          <p>
            A database project developed using SQL to manage menus, orders,
            customers, and inventory.
          </p>

          <p>
            <strong>My Role:</strong> Project Lead in a team of three.
          </p>

          <p>
            <strong>Outcome:</strong> Created a functional database structure
            for managing a cloud kitchen.
          </p>
        </div>

        <div className="project-card">
          <img src="/project2.png" alt="GPA Calculator" />

          <h2>GPA Calculator Web App</h2>

          <p>
            A web application designed to calculate grades using weighted
            assignments and course marks.
          </p>

          <p>
            <strong>My Role:</strong> Developer.
          </p>

          <p>
            <strong>Outcome:</strong> Created a working calculator that
            calculates grades based on user input.
          </p>
        </div>

        <div className="project-card">
          <img src="/project3.png" alt="One Piece Fan Website" />

          <h2>One Piece Fan Website</h2>

          <p>
            A fan website created to practice web development and present
            information about the One Piece series.
          </p>

          <p>
            <strong>My Role:</strong> Web Developer.
          </p>

          <p>
            <strong>Outcome:</strong> Created a structured website with
            multimedia content and multiple sections.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Projects;