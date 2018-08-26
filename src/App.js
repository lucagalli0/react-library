import React, { Component } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { Spring } from "react-spring";
import onClickOutside from "react-onclickoutside";
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
  border-top: 60px solid green;
  border-left: 60px solid green;
  border-right: 60px solid green;
  display: flex;
  height: 2100px;
  width: 810px;
  flex-direction: column;
  background-color: #8d735b;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
`;

const Sopra = styled(Section)`
  height: 1130px;
  margin-bottom: 20px;
`;

const Sotto = styled(Section)`
  height: 950px;
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

class App extends Component {
  state = {
    riga0: { r: 62, g: 154, b: 123, a: 0.5 },
    riga1: { r: 128, g: 128, b: 128, a: 0.5 },
    riga2: { r: 55, g: 89, b: 65, a: 0.5 },
    riga3: { r: 201, g: 201, b: 201, a: 0.5 },
    riga4: { r: 128, g: 128, b: 0, a: 0.5 },
    riga5: { r: 62, g: 154, b: 123, a: 0.5 },
    riga6: { r: 128, g: 128, b: 128, a: 0.5 },
    riga7: { r: 55, g: 89, b: 65, a: 0.5 },
    riga8: { r: 201, g: 201, b: 201, a: 0.5 },
    selected: null,
    selectedColor: null,
    showPicker: false
  };

  handleChangeComplete = color => {
    this.setState({
      [this.state.selected]: color.rgb,
      selectedColor: color.rgb
    });
  };

  handleSelect = e => {
    const { id } = e.target;
    this.setState({
      showPicker: true,
      selected: id,
      selectedColor: this.state[id]
    });
  };

  hidePicker = () => this.setState({ showPicker: false });

  render() {
    const { selected, selectedColor } = this.state;

    return (
      <Container>
        <Wrapper>
          <h1>Libreria</h1>
          {this.state.showPicker && (
            <Picker
              state={this.state}
              selected={selected}
              selectedColor={selectedColor}
              handleChangeComplete={this.handleChangeComplete}
              hidePicker={this.hidePicker}
            />
          )}
          <Porta>
            <Sopra>
              <Riga
                id="riga0"
                color={this.state.riga0}
                onClick={this.handleSelect}
                selected={selected === "riga0"}
                wood={woods[0]}
              />
              <Riga
                id="riga1"
                color={this.state.riga1}
                onClick={this.handleSelect}
                selected={selected === "riga1"}
                wood={woods[1]}
              />
              <Riga
                id="riga2"
                color={this.state.riga2}
                onClick={this.handleSelect}
                selected={selected === "riga2"}
                wood={woods[2]}
              />
              <Riga
                id="riga3"
                color={this.state.riga3}
                onClick={this.handleSelect}
                selected={selected === "riga3"}
                wood={woods[3]}
              />
              <Riga
                id="riga4"
                color={this.state.riga4}
                onClick={this.handleSelect}
                selected={selected === "riga4"}
                wood={woods[4]}
              />
            </Sopra>
            <Sotto>
              <Riga
                id="riga5"
                color={this.state.riga5}
                onClick={this.handleSelect}
                selected={selected === "riga5"}
                wood={woods[5]}
              />
              <Riga
                id="riga6"
                color={this.state.riga6}
                onClick={this.handleSelect}
                selected={selected === "riga6"}
                wood={woods[6]}
              />
              <Riga
                id="riga7"
                color={this.state.riga7}
                onClick={this.handleSelect}
                selected={selected === "riga7"}
                wood={woods[7]}
              />
              <Riga
                id="riga8"
                color={this.state.riga8}
                onClick={this.handleSelect}
                selected={selected === "riga8"}
                wood={woods[8]}
              />
            </Sotto>
          </Porta>
        </Wrapper>
      </Container>
    );
  }
}

const Picker = onClickOutside(
  class extends Component {
    handleClickOutside = () => this.props.hidePicker();

    render() {
      const {
        handleChangeComplete,
        selected,
        selectedColor,
        state
      } = this.props;
      return (
        <Spring
          to={
            selected
              ? {
                  top: 240 * (Object.keys(state).indexOf(selected) + 1)
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
  }
);

export default App;
