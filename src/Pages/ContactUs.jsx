import React from 'react'

const ContactUs = () => {
  return (
    <div>
      <section>
        <h2>Contact Us</h2>
        <p>
          Feel free to reach out to us with any inquiries or feedback. We value
          your thoughts and would love to hear from you!
        </p>

        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  )
}

export default ContactUs