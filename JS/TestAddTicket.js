// firebase.test.js

// Import the functions you need from the SDKs you need
// Mocking Firebase SDK imports
jest.mock("https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  push: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
}));

// Import the functions to be tested
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Import the function to be tested
import { addTicket } from "./yourScript.js";

// Mock DOM elements
document.body.innerHTML = `
  <input type="text" id="houseId" value="house123">
  <input type="text" id="time" value="10:00">
  <input type="text" id="day" value="1">
  <input type="text" id="month" value="January">
  <input type="text" id="count" value="5">
  <button id="addTicket">Add Ticket</button>
`;

describe("addTicket function", () => {
  test("it should add a ticket successfully", async () => {
    const mockedSnapshot = {
      exists: jest.fn().mockReturnValue(true)
    };

    const mockedThen = jest.fn().mockImplementation((callback) => callback());

    const mockedPush = jest.fn().mockReturnValue({});

    const mockedSet = jest.fn().mockResolvedValue({});

    const mockedGet = jest.fn().mockResolvedValue(mockedSnapshot);

    ref.mockReturnValue({
      then: mockedThen,
      exists: mockedExists,
      push: mockedPush,
      set: mockedSet,
      get: mockedGet
    });

    // Mocking alert function
    global.alert = jest.fn();

    // Call the function to be tested
    await addTicket();

    // Assertion
    expect(alert).toHaveBeenCalledWith("Ticket added successfully!");
  });

  test("it should alert 'Invalid House ID' when house ID does not exist", async () => {
    const mockedSnapshot = {
      exists: jest.fn().mockReturnValue(false)
    };

    const mockedThen = jest.fn().mockImplementation((callback) => callback());

    const mockedGet = jest.fn().mockResolvedValue(mockedSnapshot);

    ref.mockReturnValue({
      then: mockedThen,
      exists: mockedExists,
      get: mockedGet
    });

    // Mocking alert function
    global.alert = jest.fn();

    // Call the function to be tested
    await addTicket();

    // Assertion
    expect(alert).toHaveBeenCalledWith("Invalid House ID. Please enter a valid ID.");
  });

  test("it should alert 'Error adding ticket' when an error occurs", async () => {
    const mockedError = new Error("Error adding ticket");

    const mockedSnapshot = {
      exists: jest.fn().mockReturnValue(true)
    };

    const mockedThen = jest.fn().mockImplementation((callback) => callback());

    const mockedPush = jest.fn().mockReturnValue({});

    const mockedSet = jest.fn().mockRejectedValue(mockedError);

    const mockedGet = jest.fn().mockResolvedValue(mockedSnapshot);

    ref.mockReturnValue({
      then: mockedThen,
      exists: mockedExists,
      push: mockedPush,
      set: mockedSet,
      get: mockedGet
    });

    // Mocking alert function
    global.alert = jest.fn();

    // Call the function to be tested
    await addTicket();

    // Assertion
    expect(alert).toHaveBeenCalledWith(`Error adding ticket: ${mockedError.message}`);
  });
});
