import React, { useEffect, useState } from 'react';
import axios from '../axios';
import './One_Member_Event.css';
import { useStateValue } from '../StateProvider';
import AnimatedPage from '../templates/AnimatedPage';
import { Navigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material';

function StaffContact() {
  const [staffName1, setStaff1Name] = useState('');
  const [staffNumber1, setStaff1Number] = useState('');
  const [staffName2, setStaff2Name] = useState('');
  const [staffNumber2, setStaff2Number] = useState('');
  const [existingContact, setExistingContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [{ schoolName, schoolId }, dispatch] = useStateValue();

  useEffect(() => {
    if (schoolId) {
      axios.post('/vinterbash/teacherInfo', { schoolId })
        .then(res => {
          if (res.data && res.data.teacher1name && res.data.teacher1number&& res.data.teacher2name && res.data.teacher2number) {
            setExistingContact(res.data);
            setStaff1Name(res.data.teacher1name);
            setStaff1Number(res.data.teacher1number);
            setStaff2Name(res.data.teacher2name);
            setStaff2Number(res.data.teacher2number);
          }
        })
        .catch(err => console.error("Error fetching staff contact:", err));
    }
  }, [schoolId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!staffName1 || !staffName2 || !staffNumber1 ||!staffNumber2) {
      alert('Please fill all fields');
      return;
    }

    if (!/^\d{10}$/.test(staffNumber1)) {
      alert('Enter a valid 10-digit contact number');
      return;
    }

    if (!/^\d{10}$/.test(staffNumber2)) {
      alert('Enter a valid 10-digit contact number');
      return;
    }

    dispatch({
      type: 'staff',
      payload: { staffName1, staffName2, staffNumber1, staffNumber2 }
    });

    try {
      await axios.post('/vinterbash/teacherRegister', {
        
        schoolId,
        teacher1name:staffName1,
        teacher2name:staffName2,
        teacher1number:staffNumber1,
        teacher2number:staffNumber2
      });

      alert('Staff Contact Updated');
      setExistingContact({  staffName1,
        staffName2,
        staffNumber1,
        staffNumber2 });
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data || 'Error updating staff contact');
    }
  };

  if (!schoolName) return <Navigate to="/signIn" replace={true} />;

  return (
    <AnimatedPage>
      <div className="loginONE">
        <div className="register_container">
          <h3><u>Staff Contact</u></h3>

          {existingContact && !isEditing ? (
            <Card sx={{ background: 'linear-gradient(135deg, #F37D00, #FEC000)', borderRadius: '12px', color: 'white', padding: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: `'nevis', sans-serif`, fontSize: '20px' }}>
                  Staff Name 1: {existingContact.teacher1name}
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: `'nevis', sans-serif`, fontSize: '20px' }}>
                  Staff Contact 1: {existingContact.teacher1number}
                </Typography>
                 <Typography variant="h6" sx={{ fontFamily: `'nevis', sans-serif`, fontSize: '20px' }}>
                  Staff Name 2: {existingContact.teacher2name}
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: `'nevis', sans-serif`, fontSize: '20px' }}>
                  Staff Contact 2: {existingContact.teacher2number}
                </Typography>

                <Button
                 onClick={() => setIsEditing(true)} sx={{color:'white', backgroundColor:'transparent',marginTop:"10px",border:'3px solid white',borderColor:'white', fontFamily: `'nevis', sans-serif`,fontWeight:'600',fontSize:'15px', '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color:'black' // light gray on hover
                },}}
                >
                  Edit Contact
                </Button>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <h5>Staff Name 1</h5>
              <input
                type='text'
                value={staffName1}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^[a-zA-Z\s]*$/.test(value)) {
                    alert('Only alphabets are allowed');
                    return;
                  }
                  setStaff1Name(value);
                }}
                placeholder="Enter staff name"
                className='register_form'
              />

              <h5>Staff Contact Number 1</h5>
              <input
                type='tel'
                value={staffNumber1}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^\d*$/.test(value)) {
                    alert('Only numbers allowed');
                    return;
                  }
                  setStaff1Number(value);
                }}
                placeholder="Enter 10-digit contact number"
                className='register_form'
                maxLength={10}
              />
               <h5>Staff Name 2</h5>
              <input
                type='text'
                value={staffName2}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^[a-zA-Z\s]*$/.test(value)) {
                    alert('Only alphabets are allowed');
                    return;
                  }
                  setStaff2Name(value);
                }}
                placeholder="Enter staff name"
                className='register_form'
              />

              <h5>Staff Contact Number 2</h5>
              <input
                type='tel'
                value={staffNumber2}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^\d*$/.test(value)) {
                    alert('Only numbers allowed');
                    return;
                  }
                  setStaff2Number(value);
                }}
                placeholder="Enter 10-digit contact number"
                className='register_form'
                maxLength={10}
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: 'white', color: 'black' }}
                >
                  Submit
                </Button>

                {existingContact && (
                  <Button
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                    onClick={() => {
                      // Cancel editing and reset fields
                      setStaff1Name(existingContact.teacher1name);
                      setStaff1Number(existingContact.teacher1number);
                      setStaff2Name(existingContact.teacher2name);
                      setStaff2Number(existingContact.teacher2number);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </form>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default StaffContact;
