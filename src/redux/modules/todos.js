const initialState = {
    items: [{
		id: 1, // all id must be unique.
		title: "watch react lectures",
		body: "chapter 1 - chapter 12",
		isDone: false
	},
	{
		id: 2, // all id must be unique.
		title: "eat lunch",
		body: "what should I eat..?",
		isDone: false
	}],
}

const ADD_ITEM = 'my=app/todos/ADD_ITEM';

export const addItem = toDo => ({ type: ADD_ITEM, payload: toDo });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                items: [...state.items, action.payload],
            };
        default:
            return state;
    }
}

export default reducer;