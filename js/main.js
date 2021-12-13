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

					userBtn.onclick = () => {(addToDoBlock.style.display === 'none')
							? addToDoBlock.style.display = 'flex'
							: addToDoBlock.style.display = 'none'
					};

					let list = createElem('ol');
					userContainer.appendChild(list);

					function createToDo() {
						for(let k = 0; k < users[i].length; k++) {
							let li = createElem('li');
							list.appendChild(li);

							let inp = createElem('input');
							inp.disabled = true;
							li.appendChild(inp).value = `${users[i][k].title}`;

							let removeBtn = createElem('button');
							removeBtn.className = 'remove-btn';
							li.appendChild(removeBtn).textContent = 'Remove';

							let editBtn = createElem('button');
							editBtn.className = 'edit-btn';
							li.appendChild(editBtn).textContent = 'Edit';

							editBtn.onclick = () => {
								if (inp.disabled === true) {
									inp.disabled = false;
									inp.focus();
								} else {
									inp.disabled = true;
									fetch(`https://jsonplaceholder.typicode.com/todos/${users[i][k].id}`, {
										method: 'PATCH',
										body: JSON.stringify({title: inp.value}),
										headers: {'Content-type': 'application/json; charset=UTF-8'},
									}).then((response) => response.json())
									.then((data) => console.log(data))
								};
							};

							removeBtn.addEventListener('click', function() {
								fetch(`https://jsonplaceholder.typicode.com/todos/${users[i][k].id}`, {
									method: 'DELETE'
								}) 
								.then((response) => response.json())
								.then(() => {
									console.log(users[i].indexOf(users[i][k]))
									users[i].splice((users[i].indexOf(users[i][k])), 1)
									console.log(i, k)
									list.innerText = '';
									createToDo();
								})
							})

							addTextBtn.onclick = function() {
								let toDoForSend = {
									completed: false,
									id: users[i][users[i].length - 1].id + 1,
									userId: users[i][i].userId,
									title: `${textArea.value}`
								}
										
								users[i].unshift(toDoForSend)
									fetch('https://jsonplaceholder.typicode.com/todos',{
										method: 'POST',
										body: JSON.stringify(users[i][0]),
										headers: {'Content-type': 'application/json; charset=UTF-8'},
									}).then((response) => response.json())
										.then(function() {
											list.innerText = '',
											addToDoBlock.style.display = 'none',
											createToDo();
										})
									};
						}
					};
					createToDo();
				};
			};
			createContent();
		};
	};
};
request();
