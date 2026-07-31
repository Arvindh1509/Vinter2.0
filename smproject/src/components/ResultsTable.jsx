import React, { useState, useMemo } from "react";
import axios from "../axios";
import { useStateValue } from "../StateProvider";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const positionLabel = (pos) => {
  if (pos === 1) return " 1st";
  if (pos === 2) return " 2nd";
  if (pos === 3) return " 3rd";
  return pos;
};

export default function ResultsTable({
  results,
  setResults,
  eventId,
  allTeams,
}) {
  // const [editingResultId, setEditingResultId] = useState(null);
  // const [editPosition, setEditPosition]       = useState(1);
  const [{ organiserId }] = useStateValue();
  const [editingResultId, setEditingResultId] = useState(null);
  const [editPosition, setEditPosition] = useState(1);
  const [editSchoolId, setEditSchoolId] = useState("");
  const [editTeamId, setEditTeamId] = useState("");
  const [message, setMessage] = useState("");
  const Credit22 = [26, 24, 21, 23, 25, 22, 28, 27, 6];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const POSITION_POINTS = Credit22.includes(organiserId)
    ? { 1: 10, 2: 7, 3: 5 }
    : { 1: 7, 2: 5, 3: 3 };

  const schoolOptions = [
    ...new Map(allTeams.map((t) => [t.schoolName, t.schoolName])).keys(),
  ];
  const teamOptionsForEdit = useMemo(() => {
    if (!editSchoolId) return [];
    return allTeams.filter(
      (t) => t.schoolName?.trim() === editSchoolId?.trim(),
    );
  }, [editSchoolId, allTeams]);

  const handleEdit = (r) => {
    setEditingResultId(r.resultId);
    setEditPosition(r.position);
    setEditSchoolId(r.schoolName);
    setEditTeamId(r.teamId);
  };
  const handleEditSchoolChange = (e) => {
    setEditSchoolId(e.target.value);
    setEditTeamId("");
  };

  const handleCancel = () => {
    setEditingResultId(null);
  };

  // const handleSave = async (r) => {
  //   const teamId = r.resultId.replace(eventId, '');
  //   try {
  //     await axios.post('/vinterbash/enterResults', {
  //       event_id: eventId,
  //       team_id:  teamId,
  //       position: editPosition,
  //       points:   POSITION_POINTS[editPosition],
  //     });

  //     setResults((prev) =>
  //       prev.map((result) =>
  //         result.resultId === r.resultId
  //           ? { ...result, position: editPosition, points: POSITION_POINTS[editPosition] }
  //           : result
  //       )
  //     );
  //     setEditingResultId(null);
  //   } catch (err) {
  //     console.error('Failed to update result:', err);
  //   }
  // };

  //   const handleSave = async (r) => {
  //   // Check if another team already has the selected position
  //   const positionTaken = results.some(
  //     (result) =>
  //       result.resultId !== r.resultId &&
  //       result.position === editPosition
  //   );

  //   if (positionTaken) {
  //     alert(
  //       `${editPosition === 1 ? '1st' : editPosition === 2 ? '2nd' : '3rd'} position is already assigned to another team.`
  //     );
  //     return;
  //   }

  //   const teamId = r.resultId.replace(eventId, '');

  //   try {
  //     await axios.post('/vinterbash/enterResults', {
  //       event_id: eventId,
  //       team_id: teamId,
  //       position: editPosition,
  //       points: POSITION_POINTS[editPosition],
  //     });

  //     setResults((prev) =>
  //       prev.map((result) =>
  //         result.resultId === r.resultId
  //           ? {
  //               ...result,
  //               position: editPosition,
  //               points: POSITION_POINTS[editPosition],
  //             }
  //           : result
  //       )
  //     );

  //     setEditingResultId(null);
  //   } catch (err) {
  //     console.error('Failed to update result:', err);
  //     alert('Failed to update result');
  //   }
  // };
  const handleSave = async (r) => {
    if (!editTeamId) {
      setMessage("Select a team");
      return;
    }

    // Check position conflict (excluding the row being edited)
    const positionTaken = results.some(
      (result) =>
        result.resultId !== r.resultId && result.position === editPosition,
    );
    if (positionTaken) {
      setMessage(
        `${positionLabel(editPosition)} is already assigned to another team`,
      );
      return;
    }

    // Check team conflict (excluding the row being edited)
    const teamTaken = results.some(
      (result) =>
        result.resultId !== r.resultId && result.teamId === editTeamId,
    );
    if (teamTaken) {
      setMessage("This team already has a result entered");
      return;
    }

    const teamChanged = editTeamId !== r.teamId;
    const selectedTeam = teamOptionsForEdit.find(
      (t) => t.teamId === editTeamId,
    );

    try {
      if (teamChanged) {
        // Delete old result, insert new one
        await axios.delete(`/vinterbash/deleteResult/${r.resultId}`);
        await axios.post("/vinterbash/enterResults", {
          event_id: eventId,
          team_id: editTeamId,
          position: editPosition,
          points: POSITION_POINTS[editPosition],
        });

        const newResultId = `${eventId}${editTeamId}`;
        setResults((prev) =>
          prev.map((result) =>
            result.resultId === r.resultId
              ? {
                  resultId: newResultId,
                  teamId: editTeamId,
                  position: editPosition,
                  points: POSITION_POINTS[editPosition],
                  schoolName: editSchoolId,
                  eventName: r.eventName,
                  members: selectedTeam.members,
                }
              : result,
          ),
        );
      } else {
        // Same team, just position changed
        await axios.post("/vinterbash/enterResults", {
          event_id: eventId,
          team_id: editTeamId,
          position: editPosition,
          points: POSITION_POINTS[editPosition],
        });

        setResults((prev) =>
          prev.map((result) =>
            result.resultId === r.resultId
              ? {
                  ...result,
                  position: editPosition,
                  points: POSITION_POINTS[editPosition],
                }
              : result,
          ),
        );
      }

      setEditingResultId(null);
      setMessage("");
    } catch (err) {
      console.error("Failed to update result:", err);
      setMessage("Failed to update result");
    }
  };

  if (!results || results.length === 0) return null;

  // Shared glass field style for the Select dropdowns used in edit mode
  const glassSelectSx = {
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "8px",
    backdropFilter: "blur(6px)",
  };

  const renderPositionField = (r) =>
    editingResultId === r.resultId ? (
      <Select
        value={editPosition}
        onChange={(e) => setEditPosition(Number(e.target.value))}
        size="small"
        sx={{ ...glassSelectSx, minWidth: { xs: 100, sm: 110 }, flexShrink: 0 }}
      >
        <MenuItem value={1}> 1st</MenuItem>
        <MenuItem value={2}> 2nd</MenuItem>
        <MenuItem value={3}> 3rd</MenuItem>
      </Select>
    ) : (
      <Typography variant="body2" fontWeight={600}>
        {positionLabel(r.position)}
      </Typography>
    );

  const renderTeamField = (r) =>
    editingResultId === r.resultId ? (
      <Select
        value={editTeamId}
        onChange={(e) => setEditTeamId(e.target.value)}
        size="small"
        displayEmpty
        disabled={!editSchoolId}
        fullWidth={isMobile}
        sx={{ ...glassSelectSx, minWidth: { xs: "100%", sm: 220 } }}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        <MenuItem value="">
          {editSchoolId ? "Select team" : "Select a school first"}
        </MenuItem>
        {teamOptionsForEdit.map((t) => (
          <MenuItem key={t.teamId} value={t.teamId}>
            {`${t.teamId} — ${t.members.join(", ")}`}
          </MenuItem>
        ))}
      </Select>
    ) : (
      <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
        {r.members.join(", ")}
      </Typography>
    );

  const renderSchoolField = (r) =>
    editingResultId === r.resultId ? (
      <Select
        value={editSchoolId}
        onChange={handleEditSchoolChange}
        size="small"
        displayEmpty
        fullWidth={isMobile}
        sx={{ ...glassSelectSx, minWidth: { xs: "100%", sm: 180 } }}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        <MenuItem value="">Select school</MenuItem>
        {schoolOptions.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    ) : (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ wordBreak: "break-word" }}
      >
        {r.schoolName}
      </Typography>
    );

  const renderActions = (r) =>
    editingResultId === r.resultId ? (
      <Box display="flex" justifyContent="flex-end" gap={1} sx={{ flexShrink: 0 }}>
        <IconButton color="success" size="small" onClick={() => handleSave(r)}>
          <CheckIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
        <IconButton color="default" size="small" onClick={handleCancel}>
          <CloseIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Box>
    ) : (
      <IconButton color="primary" size="small" onClick={() => handleEdit(r)}>
        <EditIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
    );

  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 4 },
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: { xs: "14px", sm: "24px", md: "32px" },
          borderRadius: { xs: "16px", sm: "24px", md: "28px" },
          background: "rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.30)",
          boxShadow: "0 8px 32px rgba(15, 23, 42, 0.15)",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            marginBottom: { xs: "12px", sm: "20px" },
            fontSize: { xs: "1.05rem", sm: "1.25rem" },
            color: "rgba(15, 23, 42, 0.92)",
            wordBreak: "break-word",
          }}
        >
          Results — {results[0]?.eventName}
        </Typography>

        {isMobile ? (
          // ---- Mobile: stacked glass cards, one per result (no horizontal overflow) ----
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {results.map((r) => (
              <Box
                key={r.resultId}
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  borderRadius: "14px",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.16)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {renderPositionField(r)}
                  <Box sx={{ flexShrink: 0, ml: "auto" }}>
                    {renderActions(r)}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(15,23,42,0.6)", fontWeight: 600 }}
                  >
                    Participants
                  </Typography>
                  {renderTeamField(r)}
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(15,23,42,0.6)", fontWeight: 600 }}
                  >
                    School
                  </Typography>
                  {renderSchoolField(r)}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          // ---- Desktop / tablet: standard table ----
          <TableContainer
            sx={{
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.10)",
              width: "100%",
              maxWidth: "100%",
              overflowX: "auto",
              "&::-webkit-scrollbar": { height: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(15, 23, 42, 0.25)",
                borderRadius: "10px",
              },
            }}
          >
            <Table size="small" sx={{ width: "100%" }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.20)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <strong>Position</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Participants</strong>
                  </TableCell>
                  <TableCell>
                    <strong>School</strong>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    <strong>Edit</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((r) => (
                  <TableRow
                    key={r.resultId}
                    sx={{
                      "&:last-child td": { border: 0 },
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                      },
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {renderPositionField(r)}
                    </TableCell>
                    <TableCell>{renderTeamField(r)}</TableCell>
                    <TableCell>{renderSchoolField(r)}</TableCell>
                    <TableCell align="right">{renderActions(r)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {message && (
          <Typography
            sx={{
              mt: 2,
              fontWeight: 600,
              fontSize: { xs: "0.85rem", sm: "1rem" },
              color:
                message.toLowerCase().includes("taken") ||
                message.toLowerCase().includes("failed")
                  ? "error.main"
                  : "success.main",
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
