import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    test('renders the App component with AddUser and UsersList components', () => {
        const { getByText, getByRole } = render(<App />);

        const addUserComponent = getByText('Add User');
        const usersListComponent = getByRole('list');

        expect(addUserComponent).toBeInTheDocument();
        expect(usersListComponent).toBeInTheDocument();
    });

    test('adds a user to the list when the Add User form is submitted', () => {
        const { getByText, getByLabelText } = render(<App />);

        const usernameInput = getByLabelText('Username');
        const ageInput = getByLabelText('Age (Years)');
        const addUserButton = getByText('Add User');

        fireEvent.change(usernameInput, { target: { value: 'John' } });
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.click(addUserButton);

        const userInList = getByText('John (25 years old)');
        expect(userInList).toBeInTheDocument();
    });

    test('DOES NOT display an error message when Add User form is submitted correctly', () => {
        const { getByText, getByLabelText, queryByText } = render(<App />);

        const usernameInput = getByLabelText('Username');
        const ageInput = getByLabelText('Age (Years)');
        const addUserButton = getByText('Add User');

        fireEvent.change(usernameInput, { target: { value: 'John' } });
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.click(addUserButton);

        const userInList = getByText('John (25 years old)');
        expect(userInList).toBeInTheDocument();

        const errorTitle = queryByText('Invalid age');
        const errorMessage = queryByText('Plase enter a valid age (> 0).');

        expect(errorTitle).toBeNull();
        expect(errorMessage).not.toBeInTheDocument();
    });
});
