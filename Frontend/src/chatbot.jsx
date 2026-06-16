import { useState } from "react";
import { askQuestion } from "./api";

function Chatbot() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {

    if (!question.trim()) return;

    setLoading(true);

    try {

      const res = await askQuestion(question);

      setAnswer(res.data.answer);

    } catch (err) {

      console.log("FULL ERROR:", err);

      if (err.response) {

        setAnswer(
          "Server Error: " +
          JSON.stringify(err.response.data)
        );

      } else {

        setAnswer(
          "Error: Could not connect to server."
        );

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px"
      }}
    >
      <h2>Sales Analytics Chatbot</h2>

      <input
        type="text"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        onKeyDown={(e) =>
          e.key === "Enter" && send()
        }
        placeholder="Ask a question..."
        style={{
          width: "300px",
          padding: "10px"
        }}
      />

      <button
        onClick={send}
        disabled={loading}
        style={{
          marginLeft: "10px",
          padding: "10px"
        }}
      >
        {loading ? "Loading..." : "Send"}
      </button>

      {answer && (
        <div
          style={{
            marginTop: "20px"
          }}
        >
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Chatbot;