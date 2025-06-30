export const initialState={
schoolName:"",
events:[],
schoolId:"",
activeEvent:"",
activeEventId:""
}

function reducer(state,action) {
    switch (action.type) {
        case 'login':
            return{
                ...state,
                schoolName:action.schoolName,
                schoolId:action.schoolId,
                events:action.events
            }
            break;
        case 'logout':
            return{
                ...state,
                schoolName:"",
events:[],
schoolId:"",
activeEvent:"",
activeEventId:""
            }
            break;
        case 'SidebarEvent':
            return{
                ...state,
                activeEvent:action.activeEvent,
                activeEventId:action.activeEventId
            }
    
        default:
            return state;
    }
}

export default reducer;