const firebaseMock = require('firebase-mock');
const mockDatabase = new firebaseMock.MockFirebase();

// Mock the entire Firebase SDK
jest.mock('firebase', () => {
  return {
    initializeApp: jest.fn(() => {
      return {
        database: () => mockDatabase
      };
    }),
    database: jest.fn(() => mockDatabase)
  };
});
// Assuming admin.js exports the Admin class and necessary functions
const { Admin } = require('./admin.js');

describe('Admin class', () => {
  let admin;

  beforeEach(() => {
    // Reset the mock database before each test
    mockDatabase.reset();
    admin = new Admin();
  });

  test('addTicket should successfully add a ticket when house ID exists', async () => {
    // Setup: assume the house ID exists
    mockDatabase.autoFlush(true);
    mockDatabase.child('/Houses/123').set({ exists: true });

    document.getElementById = jest.fn((id) => {
      return {
        value: id === 'houseId' ? '123' : 'value'
      };
    });

    window.alert = jest.fn(); // Mock alerts

    await admin.addTicket();

    expect(window.alert).toHaveBeenCalledWith('Ticket added successfully!');
  });
  test('addTicket should alert an error when house ID does not exist', async () => {
    // Setup: assume the house ID does not exist
    mockDatabase.autoFlush(true);
    mockDatabase.child('/Houses/999').set(null);

    document.getElementById = jest.fn((id) => {
      return {
        value: id === 'houseId' ? '999' : 'value'
      };
    });

    window.alert = jest.fn(); // Mock alerts

    await admin.addTicket();

    expect(window.alert).toHaveBeenCalledWith('Invalid House ID. Please enter a valid ID.');
  });
});
