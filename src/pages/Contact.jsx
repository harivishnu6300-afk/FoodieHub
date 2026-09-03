function Contact() {
  return (
    <section
      className="
        min-h-screen
        bg-gray-100
        dark:bg-slate-950
        py-24
        transition
        duration-500
      "
    >
      <div className="max-w-5xl mx-auto px-6">
        <h1
          className="
            text-4xl
            font-extrabold
            text-center
            mb-10
            text-gray-900
            dark:text-white
          "
        >
          📞 Contact Us
        </h1>

        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-3xl
            shadow-xl
            p-8
            transition
            duration-500
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-orange-500
              mb-6
            "
          >
            FoodieHub
          </h2>

          <div
            className="
              space-y-4
              text-lg
              text-gray-700
              dark:text-gray-200
            "
          >
            <p>
              📍 <strong>Address:</strong> Hyderabad, Telangana, India
            </p>

            <p>
              📞 <strong>Phone:</strong> +91 9876543210
            </p>

            <p>
              📧 <strong>Email:</strong> support@foodiehub.com
            </p>

            <p>
              🕒 <strong>Working Hours:</strong> 9:00 AM - 10:00 PM
            </p>
          </div>

          <hr
            className="
              my-8
              border-gray-300
              dark:border-slate-600
            "
          />

          <h3
            className="
              text-2xl
              font-bold
              mb-5
              text-gray-900
              dark:text-white
            "
          >
            Send Message
          </h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="
                w-full
                border
                border-gray-300
                dark:border-slate-600
                p-3
                rounded-lg
                bg-white
                dark:bg-slate-900
                text-gray-900
                dark:text-white
                placeholder-gray-500
                dark:placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

            <input
              type="email"
              placeholder="Your Email"
              className="
                w-full
                border
                border-gray-300
                dark:border-slate-600
                p-3
                rounded-lg
                bg-white
                dark:bg-slate-900
                text-gray-900
                dark:text-white
                placeholder-gray-500
                dark:placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="
                w-full
                border
                border-gray-300
                dark:border-slate-600
                p-3
                rounded-lg
                bg-white
                dark:bg-slate-900
                text-gray-900
                dark:text-white
                placeholder-gray-500
                dark:placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            ></textarea>

            <button
              type="button"
              onClick={() => alert("Message Sent Successfully 🎉")}
              className="
                bg-orange-500
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
                hover:bg-orange-600
                hover:scale-105
                transition
                duration-300
                shadow-lg
              "
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
