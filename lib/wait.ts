// Define a function named wait that takes a time parameter
export const wait = (time: number) => 
    // Return a promise that resolves after the specified time
    new Promise(res => setTimeout(res, time));
  