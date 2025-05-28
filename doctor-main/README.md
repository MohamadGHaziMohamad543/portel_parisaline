# Doctor Application Project

This project is designed to serve as the front-end for a doctor's application. Below is a detailed explanation of the folder structure and how to work with the project using Gulp. Additionally, instructions for integrating an API to handle interactions with the interface are provided.
For more details, visit the [Fetch API Documentation](https://api.setupaligners.com/doc-Doctor)
---

## Folder Structure

### Root Level

- **`dist/`**:
  - Contains the final build output after Gulp tasks are executed. This includes minified and bundled files ready for deployment.

- **`node_modules/`**:
  - Contains all the dependencies and packages installed via `npm` or `yarn`.

- **`package-lock.json`**:
  - An auto-generated file that locks the dependency tree to ensure consistent builds across environments.

- **`gulpfile.js`**:
  - The main configuration file for Gulp tasks. It defines tasks like minification, bundling, and file watching.

---

### `src/` Folder

The main folder where the source files are organized:

- **`data/`**:
  - Used to store static data files like JSON configurations or mock data.

- **`fonts/`**:
  - Contains font files used in the application.

- **`html/`**:
  - Contains the HTML structure of the application.
  - **`Layouts/`**: Common layout templates shared across pages.
  - **`Views/`**: Individual pages of the application:
    - `appointment/`: Files related to appointments.
    - `Auth/`: Files related to authentication (e.g., login/signup).
    - `Cases/`: Files for managing cases.
    - `meet/`: Files for meeting-related functionalities.
    - `settings/`: Files for user or application settings.
    - `home.html`, `index.html`, `NotFoundPage.html`: Main HTML files for the application.

- **`images/`**:
  - Contains image assets for the application.

- **`js/`**:
  - Contains JavaScript code for the application.
  - **`Controller/`**: Logic for handling views and components:
    - Subfolders like `appointment`, `Auth`, `Cases`, `Layouts`, `Meet`, `settings` for organizing JavaScript related to specific features.
    - Files like `home.js` and `notFoundPage.js` for specific functionalities.
  - **`vendor/`**: External libraries or third-party JavaScript files.
  - **`Render.js`**: Likely responsible for rendering components dynamically.
  - **`Router.js`**: Handles routing between different views/pages.

- **`scss/` and `scssR/`**:
  - SCSS files for styling the application. These will be compiled into CSS using Gulp.

- **`sounds/`**:
  - Audio files used in the application.

- **`STL/`**:
  - Likely stores 3D model files (STL format) if used in the project.

- **`WPA/`**:
  - Files related to Web Progressive Applications (e.g., service workers, manifest).

---

### Setting up Gulp

Gulp is a task runner that automates common tasks like:

- Compiling SCSS into CSS.
- Minifying JavaScript and CSS files.
- Watching for changes in files to rebuild automatically.
- node js v12.22.12

To set up and run Gulp:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run Gulp tasks:
   ```bash
   gulp
   ```
3. Update `gulpfile.js` to customize tasks based on your project requirements.

---

# HTTPs Object Documentation

The `HTTPs` object is designed to handle HTTP POST requests for sending data and files. It provides two main functions, `POST` and `POSTFile`, to support API interactions with optional progress tracking and parameter customization.

---

## Properties

### `Token`
- **Type**: `string`
- **Description**: Stores the authorization token used for authentication.
- **Usage**: This is included in the `Authorization` header as a Bearer token.

---

## Methods

### 1. `POST`

#### **Purpose:**
Sends a POST request using the Fetch API. Supports query parameters, custom headers, and optional progress tracking for the response body.

#### **Signature:**
```javascript
POST(Link, data, params = {}, funProgras = null)
```

#### **Parameters:**
- `Link` (string): The endpoint URL.
- `data` (object): The data to send in the POST request body.
- `params` (object): Optional query parameters to append to the URL.
- `funProgras` (function): Optional callback function to track response progress.

#### **Returns:**
A `Promise` that resolves to the response data or rejects with an error.

#### **Details:**
1. Constructs the URL with query parameters using the `params` object.
2. Adds an `Authorization` header with the Bearer token.
3. Checks if the `data` has a `values` property:
   - If `true`, sends `data` as is.
   - If `false`, converts `data` to a JSON string and sets the `content-type` header to `application/json`.
4. Sends the request using `fetch` and handles:
   - Progress tracking if `funProgras` is provided.
   - Resolves with the response body as text.
   - Rejects if an error occurs.

#### **Progress Tracking Implementation:**
- Uses a `PrograssK` function to read the response body stream via a `reader`.
- Tracks the total bytes read and calls `funProgras` with the current and total byte counts.

#### **Example:**
```javascript
HTTPs.POST('https://example.com/api/data', { key: 'value' }, { param1: 'value1' })
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

---

### 2. `POSTFile`

#### **Purpose:**
Uploads a file using the `XMLHttpRequest` API. Supports query parameters, custom headers, and upload progress tracking.

#### **Signature:**
```javascript
POSTFile(Link, data, params = {}, funProgras = null)
```

#### **Parameters:**
- `Link` (string): The endpoint URL.
- `data` (object): The file data to send in the POST request body.
- `params` (object): Optional query parameters to append to the URL.
- `funProgras` (function): Optional callback function to track upload progress.

#### **Returns:**
A `Promise` that resolves to the response data or rejects with an error.

#### **Details:**
1. Constructs the URL with query parameters using the `params` object.
2. Creates an `XMLHttpRequest` object.
3. Tracks upload progress via the `xhr.upload.onprogress` event.
4. Checks if `data` has a `values` property:
   - If `false`, converts `data` to a JSON string and sets the `content-type` header to `application/json`.
5. Adds an `Authorization` header with the Bearer token.
6. Sends the request and handles:
   - `onload` to confirm upload completion.
   - `onerror` and `onabort` to handle upload failures.
   - Resolves or rejects based on the server response.

#### **Example:**
```javascript
HTTPs.POSTFile('https://example.com/api/upload', fileData, {}, progress => {
  console.log(`Uploaded: ${progress.loaded} / ${progress.total}`);
})
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

---

## Example Use Case

### Setting the Token
Before making requests, set the `HTTPs.Token` property:
```javascript
HTTPs.Token = 'your-auth-token';
```

### Making a POST Request
```javascript
HTTPs.POST('https://example.com/api/data', { name: 'John Doe' }, { age: 30 })
  .then(response => console.log('Response:', response))
  .catch(error => console.error('Error:', error));
```

### Uploading a File
```javascript
const fileData = new FormData();
fileData.append('file', fileInput.files[0]);

HTTPs.POSTFile('https://example.com/api/upload', fileData, {}, progress => {
  console.log(`Progress: ${progress.loaded}/${progress.total}`);
})
  .then(response => console.log('Upload Successful:', response))
  .catch(error => console.error('Upload Failed:', error));
```
