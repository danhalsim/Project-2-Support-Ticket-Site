function formatTimestamp(date) {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date input. Please provide a Date object.");
    };
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};


function formatDate(date) {
    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = date.getMonth() + 1; 
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
  
    return `${shortMonthNames[monthIndex - 1]} ${day}, ${year} ${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
};


function findDiff(newValue, oldValue, activeUser) {
  // Initialize an empty array to store the differences.
  const differences = [];

  // new or changed keys:
  // loop through each key in the newValue object
  for (let key in newValue) {
    // check if the key is not in the oldValue object
    if (!(key in oldValue)) {
      // if the key is not in oldValue, it must be new/added, so push a new string to the differences array
      differences.push(`${key} was added with value ${newValue[key]} by ${activeUser}.`);
    } else if (newValue[key] !== oldValue[key]) {
      // if the value of the key was changed, push a new string
      differences.push(`${key} was changed from ${oldValue[key]} to ${newValue[key]} by ${activeUser}.`);
    }
  }

  // removed keys:
  // loop through each key in the oldValue object
  for (let key in oldValue) {
    // check if the key is not in the newValue object
    if (!(key in newValue)) {
      // if the key is not in newValue, it was removed, so push a new string
      differences.push(`${key} was removed by ${activeUser}.`);
    }
  }

  return differences;
};


function determineShowHide(value) {
  return value === true ? "hidden" : "shown";
};


function determineAlignment(log, currentUser) {
  if (log.type === 'Created' || log.type === 'Modified') {
    return 'center-align';
  } else if (currentUser.id === log.userId) {
    return 'right-align';
  } else {
    return 'left-align';
  }
};


module.exports = { formatTimestamp, formatDate, findDiff, determineShowHide, determineAlignment }