import React, { Component } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { Spring } from "react-spring";
// import onClickOutside from "react-onclickoutside";
import wood from "./wood.jpg";

const top = ["top", "bottom"];
const left = ["left", "right"];

function randomWood() {
  return `${top[Math.floor(Math.random() * top.length)]} ${
    left[Math.floor(Math.random() * left.length)]
  }`;
}

const woods = Array.from({ length: 9 }, () => randomWood());

const Container = styled.div`
  height: 100vh;
  background: rgb(193, 223, 196);
  background: linear-gradient(
    180deg,
    rgba(193, 223, 196, 1) 0%,
    rgba(222, 236, 221, 0.8687850140056023) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin: auto;
  padding: 200px;
`;

const Porta = styled.div`
  border-top: 30px solid green;
  border-left: 30px solid green;
  border-right: 30px solid green;
  display: flex;
  height: calc(2100px / 2);
  width: calc(810px / 2);
  flex-direction: column;
  background-color: #8d735b;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
`;

const Sopra = styled(Section)`
  height: calc(1130px / 2);
  margin-bottom: 10px;
`;

const Sotto = styled(Section)`
  height: calc(950px / 2);
`;

const Riga = styled.div`
  background: ${props =>
    props.color
      ? `linear-gradient(rgba(${props.color.r}, ${props.color.g}, ${
          props.color.b
        }, ${props.color.a}), rgba(${props.color.r}, ${props.color.g}, ${
          props.color.b
        }, ${props.color.a})),url(${wood}) no-repeat ${props.wood}`
      : "white"};
  outline: ${props => (props.selected ? "18px solid blue" : "unset")};
`;

const initialState = {
  rows: {
    0: { top: true, r: 62, g: 154, b: 123, a: 0.5 },
    1: { top: true, r: 128, g: 128, b: 128, a: 0.5 },
    2: { top: true, r: 55, g: 89, b: 65, a: 0.5 },
    3: { top: true, r: 201, g: 201, b: 201, a: 0.5 },
    4: { top: true, r: 128, g: 128, b: 0, a: 0.5 },
    5: { top: false, r: 62, g: 154, b: 123, a: 0.5 },
    6: { top: false, r: 128, g: 128, b: 128, a: 0.5 },
    7: { top: false, r: 55, g: 89, b: 65, a: 0.5 },
    8: { top: false, r: 201, g: 201, b: 201, a: 0.5 }
  }
};

class App extends Component {
  state = {
    ...initialState,
    selected: null,
    selectedColor: null,
    showPicker: false
  };

  handleChangeComplete = color => {
    this.setState({
      ...this.state,
      rows: {
        ...this.state.rows,
        [this.state.selected]: {
          top: this.state.rows[this.state.selected].top,
          ...color.rgb
        }
      },
      selectedColor: color.rgb
    });
  };

  handleSelect = e => {
    const { id } = e.target;
    this.setState({
      showPicker: true,
      selected: id,
      selectedColor: this.state.rows[id]
    });
  };

  hidePicker = () => this.setState({ showPicker: false });

  render() {
    const { selected, selectedColor } = this.state;
    const sopra = Object.keys(this.state.rows).map(index => {
      if (this.state.rows[index].top) {
        return (
          <Riga
            id={index}
            key={index}
            color={this.state.rows[index]}
            onClick={this.handleSelect}
            selected={selected === index}
            wood={woods[index]}
          />
        );
      } else return null;
    });

    return (
      <Container>
        <Wrapper>
          <h1>Libreria</h1>
          <Picker
            rows={this.state.rows}
            selected={selected}
            selectedColor={selectedColor}
            handleChangeComplete={this.handleChangeComplete}
            hidePicker={this.hidePicker}
          />
          <Porta>
            <Sopra>{sopra}</Sopra>
          </Porta>
        </Wrapper>
      </Container>
    );
  }
}

const Picker = class extends Component {
  render() {
    const { handleChangeComplete, selected, selectedColor, rows } = this.props;
    return (
      <Spring
        to={
          selected
            ? {
                top: 240 * (Object.keys(rows).indexOf(selected) + 1)
              }
            : { top: 10 }
        }
      >
        {styles => (
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: styles.top
            }}
          >
            <SketchPicker
              color={selectedColor || "transparent"}
              onChangeComplete={handleChangeComplete}
              width={810}
            />
          </div>
        )}
      </Spring>
    );
  }
};

export default App;
