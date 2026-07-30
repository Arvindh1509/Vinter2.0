import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

function Leaderboard() {
  const [scores, setScores] = useState([]);

  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchScores = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8000/vinterbash/leaderboard",
      );
      console.log(res.data.scores);
      setScores(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  return (
    <div
      style={{
        padding: "3rem 1.5rem",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        // No background here — the homepage shell (.vb-homepage-shell) already
        // provides the image behind this page. Adding another one here was
        // what caused the "repeated" look.
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#000000",
          fontFamily: "Anton, sans-serif",
          fontWeight: 400,
          fontSize: "2.25rem",
          letterSpacing: "-0.02em",
          marginBottom: "0.8rem",
          textShadow: "0 2px 20px rgba(0,0,0,0.2)",
        }}
      >
        LEADERBOARD
      </h1>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={fetchScores}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.14)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            padding: "0.65rem 1.75rem",
            borderRadius: "999px",
            fontSize: "0.95rem",
            cursor: "pointer",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
            transition:
              "background-color 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.14)";
          }}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "#000000" }}>Loading...</p>
      ) : (
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.10)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.22)",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
           <thead>
              <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>
                <th style={{ ...th, textAlign: "center" }}>Rank</th>
                <th style={{ ...th, textAlign: "center" }}>School</th>
                <th style={{ ...th, textAlign: "center" }}>Total Points</th>
                <th style={{ ...th, width: "60px", textAlign: "center" }}></th>
              </tr>
            </thead>

            <tbody>
              {scores.map((row, index) => (
                <React.Fragment key={row.school_name}>
                  {/* Main Row */}
                  <tr
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? "rgba(255, 255, 255, 0.04)"
                          : "transparent",
                    }}
                  >
                    <td style={td}>{index + 1}</td>
                    <td style={td}>{row.school_name}</td>
                    <td style={td}>{row.total_points}</td>

                    <td
                      style={{
                        ...td,
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() => toggleRow(index)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                          padding: "6px",
                          borderRadius: "999px",
                          color: "#000000",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.12)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "transparent";
                        }}
                      >
                        {expandedRow === index ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown
                            size={20}
                            style={{
                              transform:
                                expandedRow === index
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.25s ease",
                            }}
                          />
                        )}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRow === index && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: "1.1rem",
                          background: "rgba(0, 0, 0, 0.18)",
                          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                        }}
                      >
                        {row.event_results.length === 0 ? (
                          <p
                            style={{
                              margin: 0,
                              textAlign: "center",
                              color: "rgba(255, 255, 255, 0.6)",
                            }}
                          >
                            No event results available.
                          </p>
                        ) : (
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              borderRadius: "16px",
                              overflow: "hidden",
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  background: "rgba(255, 255, 255, 0.08)",
                                }}
                              >
                                <th style={th}>Event</th>
                                <th style={th}>Position</th>
                              </tr>
                            </thead>

                            <tbody>
                              {row.event_results.map((event, i) => (
                                <tr key={i}>
                                  <td style={td}>{event.event_name}</td>
                                  <td style={td}>
                                    {event.position}
                                    {event.position === 1
                                      ? " 🥇"
                                      : event.position === 2
                                        ? " 🥈"
                                        : event.position === 3
                                          ? " 🥉"
                                          : ""}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = {
  padding: "0.85rem 1rem",
  textAlign: "left",
  fontWeight: 600,
  fontSize: "0.9rem",
  letterSpacing: "-0.01em",
  color: "#000000",
};

const td = {
  padding: "0.85rem 1rem",
  color: "#000000",
  fontSize: "0.95rem",
};

export default Leaderboard;