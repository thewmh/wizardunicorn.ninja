const Pet = ({ name, animal, breed }) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Theodore",
      animal: "Cat",
      breed: "Tuxedo",
    }),
    React.createElement(Pet, {
      name: "Kuma",
      animal: "Dog",
      breed: "Doberman",
    }),
    React.createElement(Pet, {
      name: "Salvador",
      animal: "Cat",
      breed: "Fake Russian Blue",
    }),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
