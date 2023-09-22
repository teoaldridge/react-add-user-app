import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import UsersList from './UsersList';


describe('UserList Component', () => {
    test('renders a list of users', () => {
        const users = [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob', age: 30 },
        ];

        const { getByText } = render(<UsersList users={users} />);

        users.forEach((user) => {
            const userText = `${user.name} (${user.age} years old)`;
            const userElement = getByText(userText);
            expect(userElement).toBeInTheDocument();
        });
    });

    test('renders the component with the correct CSS class', () => {
        const users = [{ id: 1, name: 'Alice', age: 25 }];
        const { container } = render(<UsersList users={users} />);

        const cardElement = container.querySelector('.users');
        expect(cardElement).toBeInTheDocument();
    });
});
