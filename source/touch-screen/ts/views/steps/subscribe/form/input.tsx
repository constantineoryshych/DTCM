import React, { Component } from "react";
import KeyboardedInput from "react-touch-screen-keyboard";
import Provider from "./../../../../services/provider";

const _INPUT_MODEL = Provider.getChild(["form", "input"]);

interface IInputState {
	value: string;
}

export class InputView extends Component<{}, IInputState> {
	public state: IInputState = { value: _INPUT_MODEL.get() };

	public render(): JSX.Element {
		const customMapping = [
			["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
			["A", "S", "D", "F", "G", "H", "J", "K", "L"],
			["Z", "X", "C", "V", "B", "N", "M", ".", "@", ".COM"]
		];

		return (
			<KeyboardedInput
				enabled={true}
				isDraggable={false}
				isFirstLetterUppercase={false}
				value={this.state.value}
				// name={this.props.name}
				placeholder={"Name@email.com"}
				onChange={this.inputChange.bind(this)}
				defaultKeyboard={customMapping}
			/>
		);
	}

	private inputChange(value: string): void {
		_INPUT_MODEL.set(value);
		this.setState({ value });
	}
}
