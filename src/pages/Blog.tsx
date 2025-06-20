import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const content = `
# My AI Blog

## 🧠 How I built my AI Study Assistant
This is a desktop app powered by Python and OpenAI's API. It can manage tasks and generate smart summaries...

## 🚀 Tips for ML Beginners
- Learn Python
- Play with Jupyter Notebooks
- Try Kaggle!
`;

export default function Blog() {
  return (
    <motion.section
      className="p-8 max-w-2xl mx-auto prose dark:prose-invert"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.section>
  );
}
