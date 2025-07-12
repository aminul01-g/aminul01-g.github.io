declare module '@giscus/react' {
  import * as React from 'react';
  interface GiscusProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping: string;
    term?: string;
    strict?: string;
    reactionsEnabled?: string;
    emitMetadata?: string;
    inputPosition?: string;
    theme?: string;
    lang?: string;
    loading?: string;
  }
  const Giscus: React.FC<GiscusProps>;
  export default Giscus;
}
