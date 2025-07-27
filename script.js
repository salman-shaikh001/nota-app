const btnEl =document.querySelector(".btn");
const appEl =document.querySelector(".app");
// fnotes will remain i local storage after refresh
getNotes().forEach((note) => {
    const noteEl = createNoteEl (note.id , note.content)
    appEl.insertBefore(noteEl,btnEl)
});

function createNoteEl(id,content){
const element = document.createElement("textarea")
element.classList.add("note")
element.placeholder="Empty note"
element.value= content;

element.addEventListener("dblclick",()=>{
const warning =confirm("Do you what to delete this note?")
if (warning){
    deleteNote(id,element)
}
}
)
element.addEventListener("input",()=>{
updateNote(id,element.value)
}   );
return element;
}
function deleteNote(id,element){
const notes= getNotes().filter((note)=>note.id != id)
saveNotes(notes)
appEl.removeChild(element);
}
function updateNote(id,content){
const notes= getNotes();
const target =notes.filter((note)=>note.id== id)[0]
target.content=content;
saveNotes(notes);
}
// to make each object id md conatact
function addNotes(){
    const notes= getNotes();
    const noteObj ={
        id: Math.floor(Math.random()* 100000),
        content:"",
    };
    const noteEl= createNoteEl(noteObj.id,noteObj.content);
    appEl.insertBefore(noteEl,btnEl)

    notes.push(noteObj);
    saveNotes(notes);
}

function saveNotes(notes){
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function getNotes(){
  return JSON.parse(localStorage.getItem("note-app") || "[]")
}

btnEl.addEventListener("click", addNotes);
