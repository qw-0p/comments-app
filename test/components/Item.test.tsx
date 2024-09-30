import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, beforeEach, expect, test } from 'vitest';
import Item from '../../src/components/Item';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AppState } from '../../src/types';

const mockStore = configureStore();
const initialState: AppState = {
	comments: [],
	loading: false,
	error: null,
	scrollPosition: 0,
};
const store = mockStore(initialState);

describe('Item Component with Redux', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<Item id={1} body="Test comment" fullName="John Doe" />
			</Provider>
		);
	});

	test('renders initial text from props', () => {
		const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(textarea.value).toEqual("Test comment");
	});

	test('updates textarea when user types', async () => {
		const newText = "Updated test comment";
		const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
		await userEvent.type(textarea, newText);
		expect(textarea.value).toContain(newText);
	});

	test('calls dispatch on comment update', async () => {
		const user = userEvent.setup();
		const newText = "Updated test comment";
		const textarea = screen.getByRole('textbox');
		await user.type(textarea, newText);

		const actions = store.getActions();
		expect(actions).toContainEqual(expect.objectContaining({
			type: 'app/changeComment',
			payload: { id: 1, body: expect.stringMatching(/Updated test comment/) }
		}));
	});

	test('calls dispatch on comment delete', async () => {
		const user = userEvent.setup();
		await user.click(screen.getByTestId('item-delete'));
		const actions = store.getActions();
		expect(actions).toContainEqual(expect.objectContaining({
			type: 'app/deleteComment',
			payload: 1
		}));
	});
});
