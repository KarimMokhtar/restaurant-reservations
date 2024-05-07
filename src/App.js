import Reservations from "./components/Reservations";
import data from "./api/reservations.json";

function App() {
  return (
    <div className="App">
      <main>
        <h1>Reservations Management</h1>
        <Reservations data={data.reservations} />
      </main>
    </div>
  );
}

export default App;
