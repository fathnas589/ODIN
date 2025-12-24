import { useEffect, useState } from "react";
import axios from "axios";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const fetchFaqs = async () => {
    const res = await axios.get(`${API_URL}/faqs`);
    setFaqs(res.data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openAddModal = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setShowModal(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!question || !answer) {
      alert("Both fields are required");
      return;
    }

    if (editingFaq) {
      await axios.put(`${API_URL}/faqs/${editingFaq.id}`, {
        question,
        answer,
      });
    } else {
      await axios.post(`${API_URL}/faqs`, { question, answer });
    }

    setShowModal(false);
    fetchFaqs();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      await axios.delete(`${API_URL}/faqs/${id}`);
      fetchFaqs();
    }
  };

  // ✅ AI REWRITE — MUST BE INSIDE COMPONENT
  const handleRewrite = async () => {
    if (!answer) {
      alert("Answer cannot be empty");
      return;
    }

    const res = await axios.post(`${API_URL}/ai/rewrite`, { answer });
    setAnswer(res.data.rewritten);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>FAQ Dashboard</h2>

      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="Search by question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
        <button style={styles.addBtn} onClick={openAddModal}>
          Add FAQ
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <button onClick={() => openEditModal(faq)}>Edit</button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(faq.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editingFaq ? "Edit FAQ" : "Add FAQ"}</h3>

            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={styles.input}
            />

            <textarea
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={styles.textarea}
            />

            <button onClick={handleRewrite} style={{ marginBottom: "10px" }}>
              Rewrite with AI
            </button>

            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "40px" },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  search: { padding: "8px", width: "60%" },
  addBtn: {
    padding: "8px 16px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  deleteBtn: { color: "red", marginLeft: "8px" },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    width: "400px",
    borderRadius: "6px",
  },
  input: { width: "100%", padding: "8px", marginBottom: "10px" },
  textarea: {
    width: "100%",
    padding: "8px",
    height: "100px",
    marginBottom: "10px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  saveBtn: {
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    padding: "6px 12px",
  },
};

export default Dashboard;
