export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-300">
      <p>&copy; {new Date().getFullYear()} Md Aminul Islam Bhuiyan Amin. All rights reserved.</p>
    </footer>
  );
}
