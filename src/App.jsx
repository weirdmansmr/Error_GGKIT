import { useState } from "react";
import "./App.css";

function App() {
	const [input, setInput] = useState();
	const [result, setResult] = useState("");
	const [disable, setDisable] = useState(false);

	const answer = new RegExp(/Квадрат/gi);

	function erroring(el) {
		if (el.match(/^\d+$/)) {
			throw new Error(
				"Не, всё-таки не число, оказывается число вызывает ошибку",
			);
		} else if (el.match(/true|false/g)) {
			throw new Error(
				`Зачем тебе булевый тип? А, ну да, поиск верного решения..`,
			);
		} else if (
			el.match(/<|>|let|const|var|function|for|if|switch|{|}|\[|\]/g)
		) {
			setDisable(true);
			throw new Error(
				"А вот это зря, не лезь со своими кодами, дальше доступа нет 🛑",
			);
		} else if (el.match(/Квадрат/gi)) {
			return 'Оказывается, ответом было само слово "Квадрат"';
		} else if (el.match(/ква/gi)) {
			throw new Error('кажется "ква" является частью ответа 🤔');
		} else if (el.match(/[a-z]/gi)) {
			throw new Error("Кажется эта программа не ладит с английским");
		} else if (typeof el == "string") {
			throw new Error("Строки? Может ты идёшь и немножко верным путём 🤏");
		}
	}

	const check = () => {
		try {
			setResult(erroring(input));
		} catch (error) {
			setResult(<>{error.message}</>);
		}
	};

	return (
		<main>
			<h1>Квадрат</h1>
			{input == undefined || input == "" ? (
				<p>Кажется эта программа выводит квадрат числа. Вводи в поле число </p>
			) : answer.test(input) ? (
				<p>Кажется, это похоже на ответ</p>
			) : disable ? (
				<p>Думаю лучше код туда не писать...</p>
			) : (
				<p>Или не число...</p>
			)}
			<input
				type="text"
				id="text"
				disabled={disable ? "disabled" : ""}
				onChange={(el) => setInput(el.target.value)}
			/>
			<button onClick={() => check()}>Пуск</button>
			<p>{result}</p>
		</main>
	);
}

export default App;
