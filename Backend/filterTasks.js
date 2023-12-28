// This function filterTasks takes two arguments: 
// tasks, which is an array of task objects, and filterCriteria, 
// which is an object containing filter criteria such as type and time.
// The JavaScript filter function is used to filter the array of tasks based on the specified criteria.
export function filterTask(tasks, filterCriteria) {
    return tasks.filter((task) => {
      let passFilter = true;
  
      if (filterCriteria.type && task.type !== filterCriteria.type) {
        passFilter = false;
      }
      if (filterCriteria.time && task.time !== filterCriteria.time) {
        passFilter = false;
      }
      return passFilter;
    });
  }