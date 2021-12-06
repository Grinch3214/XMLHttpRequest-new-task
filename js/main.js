function request() {
	const xhr = new XMLHttpRequest();

	xhr.open(
		'GET',
		'https://jsonplaceholder.typicode.com/todos',
	);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.responseType = 'json';

	xhr.send();

	xhr.onload = xhr.onerror = function (event) {
		if (this.status === 200) {
			console.log(`Ответ от сервера получен успешно, статус: ${this.status}`);
		} else {
			console.log(`Ошибка соединения, статус: ${this.status}`);
		};
	};

	xhr.onreadystatechange = function (event) {
		if (event.target.readyState === 4 &&
			event.target.status === 200) {
			let todos = xhr.response;
			let data = [];
			let users = [];
			
			for (let todo of todos) {
				data.push(todo);
			};

			users.push(data.filter(el => el.userId === 2).slice(0, 5));
			users.push(data.filter(el => el.userId === 4).slice(0, 5));
			users.push(data.filter(el => el.userId === 6).slice(0, 5));

			function createElem(idElem) {
				return document.createElement(idElem);
			};


			function createContent() {
				const body = document.querySelector('body');
				let container = createElem('div');
				body.appendChild(container).className = 'container';

				for(let i = 0; i < users.length; i++) {
					let userContainer = createElem('div');
					container.appendChild(userContainer).className = 'card';

					let userTitle = createElem('h2');
					userContainer.appendChild(userTitle);
					userTitle.innerText = `To-Do List for user № ${users[i][0].userId}`;

					let userBtn = createElem('button');
					userContainer.appendChild(userBtn).className = 'user-btn';
					userBtn.textContent = 'Add new item';

					let addToDoBlock = createElem('div');
					userContainer.appendChild(addToDoBlock).className = 'todo-block';
					addToDoBlock.style.display = 'none';

					let textArea = createElem('textarea');
					addToDoBlock.appendChild(textArea).className = 'textarea-todo';

					let addTextBtn = createElem('button');
					addToDoBlock.appendChild(addTextBtn).className = 'add-todo-btn';
					addTextBtn.innerText = 'Add';

					userBtn.onclick = () => {
						if (addToDoBlock.style.display === 'none') {
							addToDoBlock.style.display = 'flex'
						} else {
							addToDoBlock.style.display = 'none'
						};
					};

					let list = createElem('ul');
					userContainer.appendChild(list);

					let count = 0;

					for(let k = 0; k < users[i].length; k++) {
						let li = createElem('li');
						list.appendChild(li);

						let inp = createElem('input');
						inp.disabled = true;
						li.appendChild(inp).value = `${++count}. ${users[i][k].title}`;

						let removeBtn = createElem('button');
						removeBtn.className = 'remove-btn';
						li.appendChild(removeBtn).textContent = 'Remove';

						let editBtn = createElem('button');
						editBtn.className = 'edit-btn';
						li.appendChild(editBtn).textContent = 'Edit';
						editBtn.onclick = () => {
							if (inp.disabled === true) {
								inp.disabled = false;
							} else {
								inp.disabled = true;
							};
						};
					};
				};
			};
			createContent();
		};
	};
};
request();
