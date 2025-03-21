export default function ContactForm() {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Send Us a Message
        </h3>
        <form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 shadow-sm"
              placeholder="John Doe"
              required
            />
          </div>
  
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 shadow-sm"
              placeholder="john@example.com"
              required
            />
          </div>
  
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 shadow-sm"
              placeholder="How can we help you?"
              required
            />
          </div>
  
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 shadow-sm resize-none"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
  
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                type="checkbox"
                className="w-4 h-4 rounded border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-primary-500 dark:focus:ring-primary-400"
                required
              />
            </div>
            <label
              htmlFor="privacy"
              className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              I agree to the{" "}
              <a
                href="#privacy"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                privacy policy
              </a>
            </label>
          </div>
  
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 text-white font-medium rounded-lg text-base px-6 py-3.5 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  }
  