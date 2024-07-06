import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <h2>MindSpark</h2>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/login" className="button">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="button">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <h1>Unleash Your Knowledge with MindSpark</h1>
            <p>Build and take quizzes that challenge and inspire.</p>
            <Link href="#get-started" className="button">
              Get Started
            </Link>
          </div>
        </section>

        <section id="features" className="features">
          <div className="feature">
            <h2>Create Quizzes</h2>
            <p>Easily create quizzes with customizable questions and answers.</p>
          </div>
          <div className="feature">
            <h2>Take Quizzes</h2>
            <p>Explore a variety of quizzes on different topics and test your knowledge.</p>
          </div>
          <div className="feature">
            <h2>Instant Feedback</h2>
            <p>Receive immediate feedback on quiz results to track your progress.</p>
          </div>
        </section>

        <section id="testimonials" className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <p>MindSpark helped me improve my knowledge in various subjects. Highly recommended!</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial">
            <p>The quizzes are engaging and informative. I love challenging myself with MindSpark!</p>
            <span>- Jane Smith</span>
          </div>
        </section>

        <section id="get-started" className="get-started">
          <h2>Get Started Today</h2>
          <p>Join MindSpark and start creating and taking quizzes to expand your knowledge.</p>
          <Link href="/register" className="button">
            Sign Up
          </Link>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 MindSpark. All rights reserved.</p>
      </footer>
    </div>
  );
}
