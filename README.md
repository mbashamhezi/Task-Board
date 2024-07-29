Task Board Project README
Overview

This project is a task board application designed to facilitate project management. It provides a visual representation of project tasks categorized by their progress state and offers various functionalities for task management.
Features

    Task Progress Visualization: Tasks are displayed in columns representing different progress states: Not Yet Started, In Progress, and Completed.
    Deadline Indication: Each task is color-coded to indicate its deadline status. Tasks nearing the deadline are highlighted in yellow, while overdue tasks are highlighted in red.
    Task Creation: Users can define new tasks by entering a title, description, and deadline date through a modal dialog.
    Task Persistence: Properties of newly created tasks are saved in the browser's localStorage, ensuring persistence even after page refresh.
    Drag-and-Drop Functionality: Tasks can be moved between progress columns via drag-and-drop, updating their progress state accordingly.
    Task Deletion: Users can delete tasks from the task board. Deleted tasks are permanently removed and won't reappear after page refresh.

Usage

    Viewing Tasks: Upon opening the task board, users will see tasks organized in columns based on their progress state.
    Deadline Color Coding: Tasks are color-coded to indicate their proximity to the deadline.
    Adding a Task: Click the "Add Task" button to define a new task. Fill in the title, description, and deadline date in the modal dialog, then click "Save" to add the task.
    Saving Task Properties: Task properties are automatically saved in localStorage upon clicking the "Save" button.
    Updating Task Progress: Drag tasks to different progress columns to update their progress state. The changes are persisted.
    Deleting a Task: Click the "Delete" button for a task to remove it from the task board permanently.

Technologies Used

    HTML
    CSS
    JavaScript
    Day.js (for date/time manipulation)
    localStorage

Development

To contribute to the development of this project:

    Clone the repository.
    Make your changes in the appropriate files.
    Test your changes thoroughly.
    Submit a pull request detailing your modifications.

Credits

This project is authored by [Your Name]. Special thanks to [Acknowledgements].
License

This project is licensed under the [License Name]. See the LICENSE file for details.