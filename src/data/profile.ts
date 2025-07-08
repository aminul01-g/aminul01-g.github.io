export interface Profile {
  name: string;
  title: string;
  slogan: string;
  profilePic: string;
  resume: string;
  github: string;
  bio: string;
  linkedin?: string;
  leetcode?: string;
  behance?: string;
  telegram?: string;
}

export const profile: Profile = {
  name: 'Md Aminul Islam Bhuiyan',
  title: 'AI Engineering Student | Deep Learning, NLP & LLMs',
  slogan: 'Building Intelligent Systems with Python, PyTorch, and TensorFlow.',
  profilePic: 'https://avatars.githubusercontent.com/u/188814014?v=4',
  resume: '', // Add your resume link here if available
  github: 'https://github.com/aminul01-g',
  bio: 'AI Engineering Student | Deep Learning, NLP & LLMs | Python, PyTorch, TensorFlow | Building Intelligent Systems',
  linkedin: 'https://linkedin.com/in/aminulai',
  leetcode: 'https://leetcode.com/u/aminul01-lc/',
  behance: 'https://behance.net/aminul01g',
  telegram: 'https://t.me/aminul01g',
};
