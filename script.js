document.addEventListener('DOMContentLoaded', ()=> {
    let main = document.getElementById('main');
    let btnAdd = document.getElementById('btnAdd');
    let taskInput = document.getElementById('input');
    let listLayout = document.getElementById('listLayout');
    let doneLayout = document.getElementById('doneLayout')

    let list = [];
    let done = [];
      
    itemStyle = {
        backgroundColor: "#FFB433",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "15px",
        paddingBottom: "15px",
        marginTop: "10px",
        color: "white",
        display : "flex",
        alignItems : "center",
        justifyContent: "space-between"
    }

    btnAdd.onclick = ()=>{
        manageBtnAdd();  
    }

    function createList (){
        listLayout.innerHTML = "";
        listLayout.innerHTML = "";
        list.forEach((item, i)=>{
            let div = document.createElement('div');
            Object.assign(div.style, itemStyle)
            div.id = `item ${i}`;
    
            let imgContainer = document.createElement('div');
            imgContainer.id = "imgContainer";

            let textContainer = document.createElement('span');
            textContainer.id = "textContainer";
            textContainer.textContent = item;
    
            let editImg = document.createElement('img');
            editImg.src = '/images/edit.png'; 
            editImg.alt = 'Edit';
            editImg.style.cursor = 'pointer';
            editImg.style.height = '34px'
            editImg.addEventListener('click', () => {
                taskInput.value = item;
                div.style.backgroundColor = "#f79e05"
                btnAdd.textContent = "Change";
                btnAdd.onclick= ()=>{
                    if (taskInput.value == ""){
                        return;
                    }
                    list.splice(i, 1, taskInput.value);
                    createList();
                    taskInput.value = '';
                    btnAdd.textContent = 'Add';
                    btnAdd.onclick = ()=> manageBtnAdd();
                    
                }
            });
    
            // Create delete image
            let deleteImg = document.createElement('img');
            deleteImg.src = './images/dustbin.png';
            deleteImg.alt = 'Delete';
            deleteImg.style.height = '34px'
            deleteImg.style.cursor = 'pointer';
            deleteImg.addEventListener('click', () => {
                list.splice(i, 1);
                createList();
                alert(`Deleted ${item}`);
            });
    
            // Create done image
            let doneImg = document.createElement('img');
            doneImg.src = '/images/check.png';
            doneImg.alt = 'Done';
            doneImg.style.height = '30px'
            doneImg.style.cursor = 'pointer';
            doneImg.addEventListener('click', () => {
                list.splice(i, 1);
                done.push(item);
                done.reverse();
                console.log(done);
                addToDone();
                createList();
            });
    
            // Append images to the div
            imgContainer.appendChild(editImg);
            imgContainer.appendChild(deleteImg);
            imgContainer.appendChild(doneImg);
            
            div.appendChild(textContainer);
            div.appendChild(imgContainer)
           
            listLayout.appendChild(div);
        })
    }

    function addToDone(){
        doneLayout.innerHTML = "";
        done.forEach((item, i)=>{
            let div = document.createElement('div');
            Object.assign(div.style, itemStyle);
            div.style.backgroundColor = "green"
            div.style.wordBreak = "break-word";
            div.textContent = item; 
            doneLayout.appendChild(div);
        }) 
    }

    function manageBtnAdd(){
        let task = taskInput.value;
        if (task != ""){
            list.push(task);
            taskInput.value = ''; 
            list.reverse();
            createList();
        } 
    }
   
});