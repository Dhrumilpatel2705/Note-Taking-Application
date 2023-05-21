console.log("Welcome to notes app. This is app.js");
showNotes();




// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById('addTitle');
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem('titles');
  if (titles == null) {
    titlesObj = [];
  }
  else {
    titlesObj = JSON.parse(titles);
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  titlesObj.push(addTitle.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  addTitle.value = '';
  addTxt.value = "";

  //   console.log(notesObj);
  showNotes();
});


if (addTitle == 0) {
  localStorage.clear()
}


// function eide and save

function editNoteForm(index) {
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");
  let notesObj = JSON.parse(notes);
  let titlesObj = JSON.parse(titles);
  let noteContent = notesObj[index];
  let noteTitle = titlesObj[index];
  let html = `
     <div class="noteCard my-2 mx-2 card" style="width: 18rem; height: fit-content;">
        <div class="card-body">
           <h5 class="card-title"><input type="text" id="editTitle" value="${noteTitle}" /></h5>
           <p class="card-text"><textarea id="editContent">${noteContent}</textarea></p>
           <button id="saveEdit${index}" onclick="saveEdit(${index})" class="btn btn-primary">Save</button>
        </div>
     </div>
  `;
  let notesElm = document.getElementById("notes");
  notesElm.innerHTML = html;
}
function saveEdit(index) {
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");
  let notesObj = JSON.parse(notes);
  let titlesObj = JSON.parse(titles);
  let editedNoteContent = document.getElementById("editContent").value;
  let editedNoteTitle = document.getElementById("editTitle").value;
  notesObj[index] = editedNoteContent;
  titlesObj[index] = editedNoteTitle;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  showNotes();
}

//  ---------end save nd edit



// Function to show elements from localStorage
function showNotes() {
  let titles = localStorage.getItem('titles');
  if (titles == null) {
    titlesObj = [];
  }
  else {
    titlesObj = JSON.parse(titles);
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  // function to edit and save and delete notes


  let html = "";
  notesObj.forEach(function (element, index) {
   html += `
         <div class="noteCard my-2 mx-2 card" style="width: 18rem; height: fit-content;">
                 <div class="card-body">
                     <h5 class="card-title">${titlesObj[index]}</h5>
                     <p class="card-text"> ${element}</p>
                     <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                     <button id="edit${index}" onclick="editNoteForm(${index})" class="btn btn-primary">Edit Note</button>
                 </div>
             </div>`;
  });

  


  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `
    <div class="abc">
    Nothing to show! Use "Add a Note" section above to add notes.
    </div>
    `;
  }
}

// Function to delete a note
function deleteNote(index) {
  let confirmation = confirm("Are you sure you want to delete this note?");
  if (confirmation) {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    let notesObj = JSON.parse(notes);
    let titlesObj = JSON.parse(titles);
    notesObj.splice(index, 1);
    titlesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    showNotes();
  }
}



// Searching for a particular note
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    console.log(cardTxt);
  });
});



