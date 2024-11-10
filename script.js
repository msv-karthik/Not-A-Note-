const API_URL = "https://emkc.org/api/v2/piston";

const CODE_SNIPPETS = {
  javascript: `
// Sample JavaScript code
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");
`,
  python: `
# Sample Python code
def greet(name):
    print("Hello, " + name + "!")

greet("World")
`,
  java: `
// Sample Java code
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
};

const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
};


const languageSelector = document.getElementById('language-select');
const codeInput = document.getElementById('code-input');
const outputBox = document.getElementById('output');
const runCodeBtn = document.getElementById('run-button');


codeInput.value = CODE_SNIPPETS[languageSelector.value];


languageSelector.addEventListener('change', (e) => {
  const selectedLanguage = e.target.value;
  codeInput.value = CODE_SNIPPETS[selectedLanguage] || '';
});


runCodeBtn.addEventListener('click', () => {
  const language = languageSelector.value;
  const code = codeInput.value;

  
  outputBox.innerHTML = 'Running...';

  
  executeCode(language, code)
    .then((result) => {
      
      if (result && result.run && result.run.output) {
        outputBox.innerHTML = result.run.output.split("\n").map(line => `<div>${line}</div>`).join("");
      } else {
        outputBox.innerHTML = `<span style="color: red;">Error: No output returned</span>`;
      }
    })
    .catch((error) => {
      outputBox.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
    });
});


async function executeCode(language, sourceCode) {
  const version = LANGUAGE_VERSIONS[language];
  try {
    const response = await fetch(`${API_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: language,
        version: version,
        files: [{ content: sourceCode }],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to execute code');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error executing code:', error);
    throw error;
  }
}


document.addEventListener('DOMContentLoaded', () => {
    const playVideoBtn = document.getElementById('play-video-btn');
    const youtubeUrlInput = document.getElementById('youtube-url');
    const youtubeVideo = document.getElementById('youtube-video');

    playVideoBtn.addEventListener('click', () => {
        const url = youtubeUrlInput.value;
        const videoId = extractVideoId(url);

        if (videoId) {
            
            youtubeVideo.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            alert('Invalid YouTube URL');
        }
    });

    
    function extractVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
});

const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const slidingPanel = document.getElementById('slidingPanel');
const addFolderBtn = document.getElementById('addFolderBtn');
const foldersContainer = document.getElementById('foldersContainer');
const folderView = document.getElementById('folderView');
const backBtn = document.getElementById('backBtn');
const addNoteBtn = document.getElementById('addNoteBtn');
let selectedColor = '#FFA07A'; 


let folders = JSON.parse(localStorage.getItem('folders')) || {};


function saveFoldersToLocalStorage() {
    localStorage.setItem('folders', JSON.stringify(folders));
}


menuBtn.addEventListener('click', function() {
    slidingPanel.classList.add('active');
    menuBtn.style.display = 'none'; 
});


closeBtn.addEventListener('click', function() {
    slidingPanel.classList.remove('active');
    menuBtn.style.display = 'block'; 
});


addFolderBtn.addEventListener('click', function() {
    const folderId = Date.now();
    const folderName = `Folder ${folderId}`;
    folders[folderId] = { name: folderName, notes: [] };
    
    const folder = document.createElement('div');
    folder.classList.add('folder');
    folder.innerHTML = `
        <span class="folder-title" id="folder-${folderId}">${folderName}</span>
        <button class="rename-btn" id="rename-${folderId}">Rename</button>
        <button class="delete-folder-btn" id="delete-${folderId}">Delete</button>
    `;

    folder.querySelector('.folder-title').addEventListener('click', function() {
        openFolder(folderId);
    });

    folder.querySelector('.rename-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        const newName = prompt('Rename folder:', folderName);
        if (newName) {
            folder.querySelector('.folder-title').textContent = newName;
            folders[folderId].name = newName;
            saveFoldersToLocalStorage();
        }
    });

    folder.querySelector('.delete-folder-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this folder and all its notes?')) {
            folder.remove();
            delete folders[folderId];
            saveFoldersToLocalStorage();
        }
    });

    foldersContainer.appendChild(folder);
    saveFoldersToLocalStorage();
});


function openFolder(folderId) {
    foldersContainer.style.display = 'none';
    folderView.style.display = 'flex';
    folderView.innerHTML = '';
    folderView.dataset.currentFolder = folderId;

    backBtn.onclick = function() {
        foldersContainer.style.display = 'block';
        folderView.style.display = 'none';
    };

    addNoteBtn.onclick = function() {
        addNote(folderId);
    };

    
    folders[folderId].notes.forEach(note => {
        createNoteElement(folderId, note.id, note.content, note.color, note.date);
    });
}


function addNote(folderId) {
    const noteId = Date.now();
    const noteData = {
        id: noteId,
        content: '',
        color: selectedColor,
        date: new Date().toLocaleString()
    };
    folders[folderId].notes.push(noteData);
    createNoteElement(folderId, noteId, noteData.content, noteData.color, noteData.date);
    saveFoldersToLocalStorage();
}


function createNoteElement(folderId, noteId, content, color, date) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.style.backgroundColor = color;
    note.dataset.noteId = noteId;

    note.innerHTML = `
        <textarea placeholder="Type your note here..." oninput="this.style.height='';this.style.height=this.scrollHeight+'px'">${content}</textarea>
        <div class="date">${date}</div>
        <span class="delete-note">&times;</span>
    `;

    note.querySelector('textarea').addEventListener('input', function(e) {
        const updatedContent = e.target.value;
        const noteIndex = folders[folderId].notes.findIndex(n => n.id === noteId);
        if (noteIndex !== -1) {
            folders[folderId].notes[noteIndex].content = updatedContent;
            saveFoldersToLocalStorage();
        }
    });

    note.querySelector('.delete-note').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this note?')) {
            note.remove();
            folders[folderId].notes = folders[folderId].notes.filter(n => n.id !== noteId);
            saveFoldersToLocalStorage();
        }
    });

    folderView.appendChild(note);
}


const colorDivs = document.querySelectorAll('.color-picker div');
colorDivs.forEach(div => {
    div.addEventListener('click', function() {
        selectedColor = getComputedStyle(div).backgroundColor;

        const activeNote = folderView.querySelector('.note:focus-within');
        if (activeNote) {
            activeNote.style.backgroundColor = selectedColor;
            const folderId = folderView.dataset.currentFolder;
            const noteId = parseInt(activeNote.dataset.noteId);
            const noteIndex = folders[folderId].notes.findIndex(n => n.id === noteId);
            if (noteIndex !== -1) {
                folders[folderId].notes[noteIndex].color = selectedColor;
                saveFoldersToLocalStorage();
            }
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    for (const folderId in folders) {
        const folder = document.createElement('div');
        folder.classList.add('folder');
        folder.innerHTML = `
            <span class="folder-title" id="folder-${folderId}">${folders[folderId].name}</span>
            <button class="rename-btn" id="rename-${folderId}">Rename</button>
            <button class="delete-folder-btn" id="delete-${folderId}">Delete</button>
        `;

        folder.querySelector('.folder-title').addEventListener('click', function() {
            openFolder(folderId);
        });

        folder.querySelector('.rename-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            const newName = prompt('Rename folder:', folders[folderId].name);
            if (newName) {
                folder.querySelector('.folder-title').textContent = newName;
                folders[folderId].name = newName;
                saveFoldersToLocalStorage();
            }
        });

        folder.querySelector('.delete-folder-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this folder and all its notes?')) {
                folder.remove();
                delete folders[folderId];
                saveFoldersToLocalStorage();
            }
        });

        foldersContainer.appendChild(folder);
    }
});