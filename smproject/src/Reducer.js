// Helper to load persisted organizer session from localStorage
const loadPersistedSession = () => {
  try {
    const serialized = localStorage.getItem('organiserSession');
    if (serialized) {
      return JSON.parse(serialized);
    }
  } catch (err) {
    // ignore parse errors
  }
  return null;
};

// Helper to save organizer session data to localStorage
const persistOrganiserSession = (state) => {
  try {
    const sessionData = {
      organiserName: state.organiserName,
      organiserId: state.organiserId,
      role: state.role,
      assignedEvent: state.assignedEvent,
      savedResults: state.savedResults,
    };
    localStorage.setItem('organiserSession', JSON.stringify(sessionData));
  } catch (err) {
    // ignore write errors
  }
};

// Helper to clear persisted session from localStorage
const clearPersistedSession = () => {
  try {
    localStorage.removeItem('organiserSession');
  } catch (err) {
    // ignore
  }
};

// The base empty state (used as fallback for logout)
const baseState = {
  schoolName: "",
  events: [],
  savedResults: [],
  schoolId: "",
  activeEvent: "",
  activeEventId: "",
  staffName1: "",
  staffName2: "",
  staffNumber1: "",
  staffNumber2: "",
  refresh: false,
  organiserName: "",
  organiserId: "",
  role: "",
  assignedEvent: null,
};

// Build initial state: start with baseState, then overlay any persisted session
const persistedSession = loadPersistedSession();
export const initialState = persistedSession
  ? { ...baseState, ...persistedSession }
  : { ...baseState };

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        schoolName: action.schoolName,
        schoolId: action.schoolId,
        events: action.events,
      };
    case 'logout':
      clearPersistedSession();
      return { ...baseState };
    case 'organiserLogin':
      const newState = {
        ...state,
        organiserName: action.organiserName,
        organiserId: action.organiserId,
        role: action.role,
        assignedEvent: action.assignedEvent,
        savedResults: action.savedResults,
      };
      persistOrganiserSession(newState);
      return newState;
    case 'SidebarEvent':
      return {
        ...state,
        activeEvent: action.activeEvent,
        activeEventId: action.activeEventId,
      };
    case 'staff':
      console.log("Reducer payload", action.payload);
      return {
        ...state,
        staffName1: action.payload.staff1Name,
        staffName2: action.payload.staff2Name,
        staffNumber1: action.payload.staff1Number,
        staffNumber2: action.payload.staff2Number,
      };
    default:
      return state;
  }
}

export default reducer;