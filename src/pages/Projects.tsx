export default function Projects() {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <ul className="space-y-6">
        <li>
          <h3 className="text-xl font-semibold">AI Study Assistant</h3>
          <p>Python | Tkinter | OpenAI API — An intelligent app to track study tasks and generate AI-powered summaries.</p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">News Summarizer</h3>
          <p>HuggingFace | Transformers — Automatically summarizes long news articles using pre-trained NLP models.</p>
        </li>
        <li>
          <h3 className="text-xl font-semibold">Resume Parser</h3>
          <p>spaCy | FastAPI — Parses resumes and matches candidates to job descriptions using NLP techniques.</p>
        </li>
      </ul>
    </section>
  );
}
