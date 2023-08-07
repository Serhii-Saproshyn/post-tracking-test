Tracking and Finding Post Offices App

Welcome to the Tracking and Finding Post Offices App! This is a simple web application built with React and utilizing Axios to interact with the API provided by Nova Poshta (Ukraine). With this app, you can easily track the status of your packages and find the nearest post offices in your desired city.

Installation and Running
To run the application on your local computer, follow these steps:

Clone the repository to your computer:
git clone https://github.com/Serhii-Saproshyn/post-tracking-test.git

Navigate to the project directory:
cd track-post-app

Make sure you have Node.js and npm (Node Package Manager) installed.

Install the project dependencies:
npm install

Start the application:
npm start

The app will be available at http://localhost:3000/

Tracking Packages
On the home page of the application, you will see an input field for entering the package tracking number.
Enter the tracking number of your package in the appropriate field and click the "Track" button.
The app will send a request to the Nova Poshta API to retrieve information about the status of your package.
The information about the package status will be displayed on the page.
Finding Post Offices
On the home page of the application, navigate to the "Find Post Offices" section.
Enter the name of your city in the provided field and click the "Search" button.
The app will send a request to the Nova Poshta API with your search query to find post offices in the specified city.
The list of the nearest post offices for your city will be displayed on the page.

Technologies and Libraries
The application was built using the following technologies and libraries:

React - A JavaScript library for building user interfaces.
React Router - A library for handling navigation between pages in a React application.
Axios - A HTTP client for making API requests.

I hope this app helps you track your packages and find convenient Nova Poshta offices in your city. Thank you for using our application!
