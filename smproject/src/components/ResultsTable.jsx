import React, { useState } from "react";
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
  const [{ organiserId }] = useStateValue();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
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

  const startEditing = () => {
    const data = {};
    results.forEach((r) => {
      data[r.position] = {
        schoolName: r.schoolName,
        teamId: r.teamId,
      };
    });
    setEditData(data);
    setIsEditing(true);
    setMessage("");
  };

  const handleEditChange = (position, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [position]: {
        ...prev[position],
        [field]: value,
        ...(field === "schoolName" ? { teamId: "" } : {}),
      },
    }));
  };

  const handleCancelAll = () => {
    setIsEditing(false);
    setEditData({});
    setMessage("");
  };

  const handleSaveAll = async () => {
    // Validate all positions have teams selected
    for (const [position, data] of Object.entries(editData)) {
      if (!data.teamId) {
        setMessage(
          `Select a team for ${positionLabel(Number(position))} position`,
        );
        return;
      }
    }

    // Check for duplicate teams
    const teamIds = Object.values(editData).map((d) => d.teamId);
    if (new Set(teamIds).size !== teamIds.length) {
      setMessage("Each position must have a different team");
      return;
    }

    try {
      // Delete all existing results
      await Promise.all(
        results.map((r) =>
          axios.delete(`/vinterbash/deleteResult/${r.resultId}`),
        ),
      );

      // Insert all new results
      await Promise.all(
        Object.entries(editData).map(([position, data]) =>
          axios.post("/vinterbash/enterResults", {
            event_id: eventId,
            team_id: data.teamId,
            position: Number(position),
            points: POSITION_POINTS[Number(position)],
          }),
        ),
      );

      // Update local state
      const newResults = Object.entries(editData).map(([position, data]) => {
        const selectedTeam = allTeams.find((t) => t.teamId === data.teamId);
        return {
          resultId: `${eventId}${data.teamId}`,
          teamId: data.teamId,
          position: Number(position),
          schoolName: data.schoolName,
          eventName: results[0]?.eventName,
          members: selectedTeam?.members || [],
        };
      });

      setResults(newResults);
      setIsEditing(false);
      setEditData({});
      setMessage("");
    } catch (err) {
      console.error("Failed to update results:", err);
      setMessage("Failed to update results");
    }
  };

  if (!results || results.length === 0) return null;

  // Shared glass field style for the Select dropdowns used in edit mode
  const glassSelectSx = {
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "8px",
    backdropFilter: "blur(6px)",
  };

  const getTeamOptionsForPosition = (position) => {
    const schoolName = editData[position]?.schoolName;
    if (!schoolName) return [];
    return allTeams.filter(
      (t) => t.schoolName?.trim() === schoolName?.trim(),
    );
  };

  const renderPositionField = (r) => (
    <Typography variant="body2" fontWeight={600}>
      {positionLabel(r.position)}
    </Typography>
  );

  const renderTeamField = (r) =>
    isEditing ? (
      <Select
        value={editData[r.position]?.teamId || ""}
        onChange={(e) => handleEditChange(r.position, "teamId", e.target.value)}
        size="small"
        displayEmpty
        disabled={!editData[r.position]?.schoolName}
        fullWidth={isMobile}
        sx={{ ...glassSelectSx, minWidth: { xs: "100%", sm: 220 } }}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        <MenuItem value="">
          {editData[r.position]?.schoolName ? "Select team" : "Select a school first"}
        </MenuItem>
        {getTeamOptionsForPosition(r.position).map((t) => (
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
    isEditing ? (
      <Select
        value={editData[r.position]?.schoolName || ""}
        onChange={(e) => handleEditChange(r.position, "schoolName", e.target.value)}
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

  const renderActions = () =>
    isEditing ? (
      <Box display="flex" justifyContent="flex-end" gap={1} sx={{ flexShrink: 0 }}>
        <IconButton color="success" size="small" onClick={handleSaveAll}>
          <CheckIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
        <IconButton color="default" size="small" onClick={handleCancelAll}>
          <CloseIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Box>
    ) : (
      <IconButton color="primary" size="small" onClick={startEditing}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: { xs: "12px", sm: "20px" },
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", sm: "1.25rem" },
              color: "rgba(15, 23, 42, 0.92)",
              wordBreak: "break-word",
            }}
          >
            Results — {results[0]?.eventName}
          </Typography>
          {renderActions()}
        </Box>

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
