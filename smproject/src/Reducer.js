export const initialState = {
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
  assignedEvent: null, // { eventId, eventName, participants }
};

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
      return { ...initialState };
    case 'organiserLogin':
      return {
        ...state,
        organiserName: action.organiserName,
        organiserId: action.organiserId,
        role: action.role,
        assignedEvent: action.assignedEvent, // ADD THIS
        savedResults: action.savedResults, 
      };
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