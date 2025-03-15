Timer Application
This is a simple, yet functional, Timer application built using HTML, CSS, and TypeScript. The app provides a user-friendly interface with a variety of features including a stopwatch, the ability to save times, and a reset function. It also saves the last few recorded times in the browser's localStorage, so users can review them later.

Features:
Start/Stop Timer: The user can start or stop the timer at any point. The "Start" button changes to "Resume" once the timer is stopped, allowing the user to resume from where they left off.
Reset Timer: The timer can be reset back to 00:00:00.
Save Time: Users can save the current timer value to a list of saved times. The app stores the last 10 times in localStorage, and up to 3 times can be displayed at once on the page.
Smooth UI: The app features smooth transitions when saving and deleting times, making the interaction more enjoyable.
Local Storage: Saved times persist even after refreshing the page, as they are stored in the browser's localStorage.
How it Works:
The user can interact with the timer using the buttons: "Start", "Stop", "Save", and "Reset".
When a time is saved, it is added to a list that shows up below the timer.
The last 3 saved times are displayed with a "Delete" button to remove them.
If the user deletes a saved time, it is smoothly faded out before being removed from the list.
Technologies Used:
HTML: For creating the structure of the app.
CSS: For styling and adding smooth animations for interactions.
TypeScript: For handling the logic of the timer, saving times, and managing localStorage.
Installation:
Clone the repository:

git clone https://github.com/yourusername/timer-app.git
Open the project folder.
Open the index.html file in your browser to start using the app.
Screenshots:
(You can include a screenshot here if you want to show the visual aspect of your app.)

Contributing:
Feel free to fork this repository and submit pull requests for improvements or new features. All contributions are welcome!

License:
This project is licensed under the MIT License - see the LICENSE file for details.
