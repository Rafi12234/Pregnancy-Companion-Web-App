import React, { useState } from "react";
import "./SignUp.css";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const errors = {
    name: form.name.trim().length < 2 ? "Please enter your full name." : "",
    email: !emailRegex.test(form.email) ? "Enter a valid email address." : "",
    password:
      form.password.length < 6 ? "Password must be at least 6 characters." : "",
  };

  const isValid = !errors.name && !errors.email && !errors.password;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    setTouched({ name: true, email: true, password: true });
    if (!isValid) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", password: "" });
      } else {
        setServerError(data.message || "Signup failed");
      }
    } catch (err) {
      setServerError("Server error. Please try again later.");
    }
  }

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSubmit} noValidate>
        <h1 className="title">Create your account</h1>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby="name-error"
            required
          />
          {touched.name && errors.name && (
            <p id="name-error" className="error">{errors.name}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby="email-error"
            required
          />
          {touched.email && errors.email && (
            <p id="email-error" className="error">{errors.email}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.password && errors.password)}
            aria-describedby="password-error"
            required
          />
          {touched.password && errors.password && (
            <p id="password-error" className="error">{errors.password}</p>
          )}
        </div>

        <button className="submit" type="submit" disabled={!isValid}>
          Sign Up
        </button>

        {serverError && <p className="error" style={{ marginTop: 10 }}>{serverError}</p>}

        {submitted && (
          <div role="status" className="success" style={{ marginTop: 12 }}>
            ✅ Thanks! Your sign-up details were submitted.
          </div>
        )}
      </form>
    </div>
  );
}
