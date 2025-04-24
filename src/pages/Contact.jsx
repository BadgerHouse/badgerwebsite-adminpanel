// Contact.jsx
import React, { useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formRef.current["name"].value;
    const email = formRef.current["email"].value;
    const message = formRef.current["message"].value;

    const telegramMessage = `
📩 Yeni Form Mesajı

👤 İsim: ${name}
📧 E-mail: ${email}
📝 Mesaj: ${message}
`;

    fetch(`https://api.telegram.org/bot7891413381:AAFdFq1Vxnu9jELL0-hPXZc_yUhUV7dKChI/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "-4681784118",
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Mesaj başarıyla gönderildi!");
          formRef.current.reset();
        } else {
          alert("Mesaj gönderilemedi.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Mesaj gönderilirken hata oluştu.");
      });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
      </section>

      <section className="contact-content">
        <div className="contact-left">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dumm
          </p>
        </div>
        <div className="contact-form-container">
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <label>Name</label>
            <input type="text" name="name" placeholder="ilayda yüksel" required />

            <label>E-Mail</label>
            <input type="email" name="email" placeholder="ilaydayuksel@the.badgerhouse" required />

            <label>Message</label>
            <textarea name="message" placeholder="Your Message..." rows={5} required></textarea>

            <button type="submit">Contact Us</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
