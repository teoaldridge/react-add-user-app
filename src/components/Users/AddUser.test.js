import '@testing-library/jest-dom';

import AddUser from "./AddUser";
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Enzyme from 'enzyme';
// import { shallow } from 'enzyme';
// import Adapter from '@cfaester/enzyme-adapter-react-18';
// import Modal from 'react-modal';
// import ErrorModal from '../UI/ErrorModal';



describe('AddUser Component', () => {
    test("renders 'Username', 'Age' and 'Add User' as text", () => {
        // Arrange
        //!!!Note that with render here we test the rendering of AddUser 
        //plus all the components that are added to it.
        render(<AddUser />);

        // Act

        // Assert
        const usernameText = screen.getByText(/Username/, { exact: false });
        expect(usernameText).toBeInTheDocument();
        const ageText = screen.getByText(/Age/, { exact: false });
        expect(ageText).toBeInTheDocument();
        const addUserText = screen.getByText(/Add User/, { exact: false });
        expect(addUserText).toBeInTheDocument();
    });


    test('renders Username value after it has been added', async () => {
        render(<AddUser />);
        //screen.debug(); //to check the DOM structure in the console
        //screen.getAllByRole(''); //to check all available roles in the console

        //expect this text to not be present at first render
        expect(screen.queryByText(/Sarah/)).toBeNull();

        //fire the userEvent
        userEvent.type(screen.getByRole('textbox'), 'Sarah');

        //expect this text to be present after the event
        waitFor(() =>
            expect(screen.getByText('Sarah')).toBeInTheDocument()
        );
    });

    test('updates Age value after it has been added', async () => {
        render(<AddUser />);

        //expect this text to not be present at first render
        //expect(screen.queryByText(/57/)).toBeNull();
        expect(screen.getByRole('spinbutton').value).toBe('');

        //fire the userEvent **Used fireEvent, because userEvent did not work. Related to this issue: https://github.com/testing-library/user-event/issues/411#issuecomment-1046488077 (edited) 
        fireEvent.change(screen.getByRole('spinbutton'), {
            target: { value: '23' },
        });

        //expect this text to be present after the event
        await waitFor(() =>
            expect(screen.getByRole('spinbutton').value).toBe('23')
        );
    });


    test('renders the AddUser component', () => {
        const { getByText, getByLabelText } = render(<AddUser />);

        const usernameInput = getByLabelText('Username');
        const ageInput = getByLabelText('Age (Years)');
        const addUserButton = getByText('Add User');

        expect(usernameInput).toBeInTheDocument();
        expect(ageInput).toBeInTheDocument();
        expect(addUserButton).toBeInTheDocument();
    });

    test('displays an error message when submitting with empty fields', () => {
        const { getByText, getByLabelText } = render(<AddUser />);
        const addUserButton = getByText('Add User');

        fireEvent.click(addUserButton);

        const errorTitle = getByText('Invalid input');
        const errorMessage = getByText('Please enter a valid name and age (non-empty values).');

        expect(errorTitle).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays an error message when entering an invalid age', () => {
        const { getByText, getByLabelText } = render(<AddUser />);
        const usernameInput = getByLabelText('Username');
        const ageInput = getByLabelText('Age (Years)');
        const addUserButton = getByText('Add User');

        fireEvent.change(usernameInput, { target: { value: 'John' } });
        fireEvent.change(ageInput, { target: { value: '0' } });
        fireEvent.click(addUserButton);

        const errorTitle = getByText('Invalid age');
        const errorMessage = getByText('Plase enter a valid age (> 0).');

        expect(errorTitle).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });

});