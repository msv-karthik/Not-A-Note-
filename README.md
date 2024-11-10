# Not-A-Note!

A web-based application that allows users to run code snippets in multiple programming languages (JavaScript, Python, Java), watch YouTube videos, and organize notes into folders with color-coded customization. It provides a platform to execute code directly from the browser, with an integrated notes management system and customizable UI elements.

## Features

- **Run Code Snippets**: Execute code in JavaScript, Python, or Java with real-time output.
- **YouTube Integration**: Embed and play YouTube videos based on URL input.
- **Note Management**: Organize notes into folders with the ability to add, rename, and delete notes.
- **Customizable Notes**: Change the background color of notes and save them to local storage.
- **Sliding Panel**: A sliding panel to access the notes and folder management system.
- **Persistent Folders and Notes**: Store folders and notes in local storage so they persist across sessions.
- **Code Highlighting**: Syntax highlighting for JavaScript, Python, and Java within the note editor.



## Installation

### Prerequisites

1. A modern web browser (Chrome, Firefox, Safari, etc.)
2. Node.js (if you want to run a local server for testing or development)

### Steps to run locally

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/note-a-note.git
    ```

2. **Navigate into the project directory**:

    ```bash
    cd note-a-note
    ```

3. **Open the `index.html` file** in your browser:
    - Simply double-click on `index.html` to open the app in your default web browser.

4. **For local server setup (optional)**:
    - If you want to run the app on a local development server, you can use a simple server like [http-server](https://www.npmjs.com/package/http-server):
    
        1. Install `http-server` globally:

            ```bash
            npm install -g http-server
            ```

        2. Run the server:

            ```bash
            http-server .
            ```

        3. Open your browser and go to `http://localhost:8080`.

## Usage

### Code Execution:

1. Select a programming language from the **Language Selector** dropdown (JavaScript, Python, or Java).
2. Edit the code in the **Code Input** area.
3. Click the **Run** button to execute the code.
4. The result of the code execution will be displayed in the **Output** section below the input box.

### YouTube Video Embedding:

1. Paste a YouTube video URL into the **Enter YouTube URL** input field.
2. Click the **Search** button to embed the video.
3. The video will appear below the input field.

### Notes Management:

1. Open the sliding panel by clicking the **Open Panel** button in the navigation bar.
2. **Add Folder**: Click **+ Add New Folder** to create a new folder for organizing your notes.
3. **Add Note**: Inside a folder, click **+ Add Note** to create a new note.
4. **Color Picker**: Select a color for the note background by clicking on the color swatches in the sliding panel.
5. **Rename Folder**: Click the **Rename** button next to a folder title to rename it.
6. **Delete Folder or Note**: Click the **Delete** button to remove a folder or note.

### Persistent Data:

- The app uses **localStorage** to save folders and notes so that the data persists even after closing the browser.

## Folder and Notes Structure

The folders are stored in an object, and each folder can contain multiple notes. Each note has the following properties:

- `id`: A unique identifier for the note.
- `content`: The text inside the note.
- `color`: The background color of the note.
- `date`: The date the note was created.

The folder and note data are stored in `localStorage`, ensuring that your notes are saved across sessions.

## Technologies Used

- **HTML5** for structure.
- **CSS3** for styling.
- **JavaScript** for dynamic behavior and API interactions.
- **Font Awesome** for icons.
- **Piston API** for code execution in multiple languages (JavaScript, Python, Java).

## File Structure

```
note-a-note/
│
├── index.html              # Main HTML file
├── style.css               # CSS file for styling
├── script.js               # JavaScript file containing app logic
├── README.md               # Project documentation
└── assets/                 # (Optional) Folder for assets such as images or icons
```


## API Integration

The app uses the **Piston API** to execute code snippets in the selected language. The available languages are:

- JavaScript (version 18.15.0)
- Python (version 3.10.0)
- Java (version 15.0.2)

The API allows you to send code, execute it, and receive the output in the response.

