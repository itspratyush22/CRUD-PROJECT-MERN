import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function EnquiryForm({ formData, onChange, onSubmit }) {
  return (
    <div className="form-wrapper">
      <h2 className="heading">Contact Form</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={onChange}
            placeholder="Your full name"
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            placeholder="+91 9876543210"
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            placeholder="Write your message here..."
            rows="4"
          />
        </label>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

function InquiryList({ submissions }) {
  return (
    <div className="list-wrapper">
      <h3>Inquiry List</h3>
      <table>
        <thead>
          <tr>
            <th>SR NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No inquiries yet.
              </td>
            </tr>
          ) : (
            submissions.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submissions, setSubmissions] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in Name, Email, and Phone.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/web/api/enquiry-insert", formData);
      setSubmissions((prev) => [...prev, formData]);
      setFormData({ name: "", email: "", phone: "", message: "" });
      // Add locally on success
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="container-side">
      <EnquiryForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <InquiryList submissions={submissions} />
    </div>
  );
}
