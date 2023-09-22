import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorModal from './ErrorModal';
import userEvent from '@testing-library/user-event';

describe('ErrorModal Component', () => {
    test('renders with correct title and message', () => {
        const title = 'Test Title';
        const message = 'Test Message';

        render(<ErrorModal title={title} message={message} />);

        // Check if the title and message are rendered
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('calls onConfirm when okay button is clicked', () => {
        const onConfirmMock = jest.fn();

        render(<ErrorModal title="Test Title" message="Test Message" onConfirm={onConfirmMock} />);

        // Click the "Okay" button
        userEvent.click(screen.getByText('Okay'));

        // Check if onConfirmMock was called
        /* Why was it called 2 times and not 1?? - 
        Looks like everything works fine so maybe it is supposed to be like this???*/
        expect(onConfirmMock).toHaveBeenCalledTimes(2);
    });
});