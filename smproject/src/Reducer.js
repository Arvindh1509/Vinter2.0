export const initialState={
schoolName:"",
events:[],
schoolId:"",
activeEvent:"",
activeEventId:"",
staffName1:"", 
staffName2:"",
staffNumber1:"",
staffNumber2:"",
refresh:false
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
                activeEventId:"",
                staffName1:"", 
                staffName2:"",
                staffNumber1:"",
                staffNumber2:"",
                refresh:false
            }
            break;
        case 'SidebarEvent':
            return{
                ...state,
                activeEvent:action.activeEvent,
                activeEventId:action.activeEventId
            }
        
        case 'staff':
            return{
                ...state,
                staffName1:action.payload.staffName1,
                staffName2:action.payload.staffName2,
                staffNumber1:action.payload.staffNumber1,
                staffNumber2:action.payload.staffNumber2
            }
    
        default:
            return state;
    }
}

export default reducer;