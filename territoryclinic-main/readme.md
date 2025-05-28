# Parisaline terCP Interface Project (AngularJS, Gulp, Node.js 12)

## Overview
This guide explains how to integrate the **API** into your Parisaline terCP Interface project, connecting it with the backend (Node.js) and frontend (AngularJS). The API documentation is available at the following link: [API Documentation](https://api.setupaligners.com/doc-PTERCS).


## Project Structure

### Directories and Files

- **dist**: 
  - Contains the processed (minified) files that are used in production after being built with Gulp.

- **gulpfile.js**: 
  - The main file for configuring **Gulp** tasks. It contains all the automated build tasks such as file minification, SCSS to CSS conversion, and other optimizations.

- **node_modules**: 
  - Contains all the packages installed via **npm** (Node Package Manager) that are dependencies for the project.

- **package-lock.json** and **package.json**:
  - **package.json**: Contains metadata about the project, including the project's dependencies and scripts.
  - **package-lock.json**: Keeps track of the exact versions of dependencies installed to ensure consistency across different environments.

- **src**: 
  - This is the source directory that contains all the source code for the project. It is further subdivided into the following folders:

#### Subdirectories within `src`:

- **STL**: 
  - This folder may contain 3D models or STL files that are related to the treatment planning or 3D visualization part of the application.

- **data**: 
  - This folder stores raw data or JSON files used throughout the application.

- **html**: 
  - Contains the HTML files that structure the pages of the application.

- **js**: 
  - Contains **JavaScript** files that make up the core logic of the application. This folder includes **AngularJS controllers**, **directives**, **services**, and **components** that define the behavior of the application.

- **scss**: 
  - Contains **SCSS** (Sassy CSS) files, which are preprocessed into **CSS** for styling the application.

- **sounds**: 
  - Stores sound files used in the application, such as audio cues or sound effects.

- **WPA**: 
  - Likely related to **Web Progressive Apps (WPA)**, containing settings for progressive web application features such as offline support and background sync.

- **fonts**: 
  - Contains font files used throughout the application.

- **images**: 
  - Stores image files like logos, icons, and other graphical elements used in the UI.

- **manifest.json**: 
  - A file containing settings and metadata for the Progressive Web App (WPA), such as the app's icons, background color, and display options.

- **servicesWorker.js**: 
  - Contains the code for the **Service Worker**, enabling offline capabilities and background sync for the web application.

---

## Roles and Functions

### **reander.js** and **router.js**
- **reander.js** and **router.js** are essential files for setting up and initializing **AngularJS controllers** and **components** inside the application.
  - **router.js**: Manages the routing of the application, defining how users navigate between different pages or views within the app using **AngularJS Router**.
  - **reander.js**: Ensures that **AngularJS controllers** and **components** are correctly linked to the appropriate HTML elements, enabling dynamic rendering and interaction within the app.

---

## Building and Running the Application

1. **Set up the environment**:
   - Ensure that **Node.js 12** and **npm** are installed on your machine.
   - To install the required dependencies, run:
     ```bash
     npm install
     ```

2. **Run Gulp tasks**:
   - To build and optimize the project files, use Gulp with the following command:
     ```bash
     gulp build
     ```

3. **Start the server**:
   - To run the application on a local server, use:
     ```bash
     gulp
     ```

4. **Navigation and Rendering**:
   - Once the application is running, the **HTML** and **JavaScript** files will load in the browser, initializing the **AngularJS controllers** and **components** through **router.js** and **reander.js**.

---

## Technologies Used

- **AngularJS**: A JavaScript framework for building single-page applications (SPA).
- **Node.js**: A JavaScript runtime environment used for server-side development.
- **Gulp**: A task runner for automating repetitive tasks such as file minification, SCSS to CSS conversion, and build optimization.
- **SCSS**: A syntax extension for CSS that enhances its functionality, making it easier to write and maintain.
- **Service Workers**: A feature that enables offline access and background synchronization for web applications.
- **WPA (Web Progressive Apps)**: A set of techniques to enhance the user experience by making web apps feel more like native apps, including offline support.

---
# How to Add a New Controller in Project

This guide explains how to add a **Controller** to your AngularJS application using the necessary setup and activation procedures.

## 1. Defining the Controller

First, you need to define the new **Controller** within the `$ANContreoller` object. Each Controller contains a function (e.g., `FUN`) that holds the logic of the Controller.

### Example:

```javascript
$ANContreoller.newController = {
    FUN: ['$scope', '$location', function ($scope, $location) {
        // Controller Logic
        $scope.message = "Welcome to the new Controller!";
    }],
    Router: {
        Url: "/newController", // Set the URL to access the Controller
        Template: 'Views/newController.html', // Set the associated template (HTML) for the Controller
        Render: [
            { link: 'assets/libs/some-library.css', type: "CSS" }, // Add CSS files
            { link: 'assets/libs/some-library.js', type: "JS" } // Add JS files
        ],
        AUTH: true // Define if authentication is required for this Controller
    }
};
```
----
## Notes

- This project leverages modern technologies like **AngularJS** and **Service Workers** to improve performance and user experience, especially in **offline** scenarios.
- **Gulp** is used to automate common build tasks, streamlining the development process.
- The application has been designed to support 3D Parisaline treatment planning, where files like **STL** models may be used for treatment visualization.
- **Web Progressive Apps (WPA)** features enable users to install the application on their devices and access it offline, offering a more seamless experience.

