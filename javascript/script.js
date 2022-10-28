//Varíavel que armazena os autores do melhor projeto :)
let __authors__ = 'Lavnisy & Sara <3';

//Verifica se tem algum valor em um array
function in_array(array,element){
	let answer = false;
	for(i in array){
		if (element == array[i]){
			answer = true;
		}
	}
	if (answer){
		return true;
	}
}

//Adiciona elementos a tabela que mostra a presença dos alunos
function show_table(array1,array2,table,element1,element2){
	element1.style.display = 'none';
	element2.style.display = 'none';
	table.style.display = 'block';
	let tbody = document.getElementById('tbody');
	for(element in array2){
		let table_row = document.createElement('tr');
		let table_name = document.createElement('td');
		let table_attendance = document.createElement('td');
		let text1 = document.createTextNode(`${array2[element][1]}`);
		let text2 = document.createTextNode('P');
		let text3 = document.createTextNode('F');
				
		table_attendance.appendChild(text3);
		table_name.appendChild(text1);
				
		let is_there = in_array(array1,array2[element][1]);
				
		if(is_there){
			table_attendance.innerHTML = 'P';
		}
				
		table_row.appendChild(table_name);
		table_row.appendChild(table_attendance);
				
		tbody.appendChild(table_row);
				
	}
}

//Muda o botão de acordo
function changeButton(button,main_content,video,cam,confirmed,video_box,get_table){
		
	if (button.id == 'stop-button'){
				
		button.style.background = 'crimson';
		button.innerHTML = 'Parar Frequência';
				
		main_content.style.display = 'none';
				
		confirmed.style.display = 'block';
		video_box.style.display = 'block';
				
		button.style.marginTop = 5 + "px";
		video.start();
	}
		
	else{
		button.style.background = 'grey';
		button.innerHTML = 'Frequência Já realizada';
		button.id = 'attendance-over';
		button.style.marginTop = 5 +"px";
				
		main_content.style.display = 'block';
		confirmed.style.display = 'none';
		video_box.style.display = 'none';
		get_table.style.display = 'inline';
				
		video.stop();
	}
}

//Inicia uma verificação para iniciar a camêra
function start(button,video,changebtn,confirmed,main_content,cam,video_box,get_table,audio){
	button.style.position = 'relative';
		
	button.addEventListener('click',event => {
				
		if(button.id != 'attendance-over'){
			navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false}).then(
			stream =>	{
				video.srcObject = stream;
			})
			changebtn == 0?changebtn += 1:changebtn -= 1;
			changebtn > 0?button.id = 'stop-button':button.id = 'start-button';
			changeButton(button,main_content,video,cam,confirmed,video_box,get_table);
		}
	})
}

//Inicia Tudo
function Init(video,button,audio,main_content,students){
	let get_table = document.getElementById('get-table');
	let confirmed = document.getElementById('confirmed-attendance');
	let video_box = document.getElementById('video-content');
	let student = document.getElementById('student');
		
	let replace = 0;
		
	let Scanner = new QrScanner(video,result => {
		let is_there = in_array(students,result.data);
		if (!is_there){
			audio.play()
			student.innerHTML = result.data;
			students.push(result.data);
						
		}
	    },
		{
				highlightScanRegion:true,
				highlightCodeOutline:true
		},
		overlay = video_box
		);
		
	Scanner._updateOverlay()
	start(button,Scanner,replace,confirmed,main_content,video,video_box,get_table,audio)
}
