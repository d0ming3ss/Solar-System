import SolarSystem from "./solarsystem";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="stars">
        {/* Gwiazdy tła */}
        {Array(100)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
      </div>
      <SolarSystem />
    </div>
  );
}

export default App;
