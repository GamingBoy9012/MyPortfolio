function About() {
  return (
    <div className="page">
      <h1>About Me</h1>

      <img
        src="/profile.jpeg"
        alt="Profile"
        width="200"
      />

      <h2>Dhruvin Suvagiya</h2>

      <p>
        I am a Software Engineering Technology - AI student at Centennial
        College with an interest in software development, artificial
        intelligence, and web application development.
      </p>

      <p>
        I enjoy learning new technologies and building applications that
        improve my programming and problem-solving skills.
      </p>

      <a
        href="/resume/Resume_Dhruvin.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        View My Resume
      </a>
    </div>
  );
}

export default About;