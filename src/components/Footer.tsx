export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-300">
      <p>&copy; {new Date().getFullYear()} Md Aminul Islam Bhuiyan Amin. All rights reserved.</p>
      <a href="/accessibility-statement.html" className="text-sm text-primary underline hover:text-indigo-500 ml-4">Accessibility Statement</a>
    </footer>
  );
}
