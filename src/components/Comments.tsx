// eslint-disable-next-line import/no-unresolved
import Giscus from '@giscus/react';

export default function Comments(): React.ReactElement {
  return (
    <div className="max-w-3xl mx-auto my-8">
      <Giscus
        id="comments"
        repo="aminul01-g/aminul01-g.github.io"
        repoId="R_kgDOLqQqXg"
        category="Announcements"
        categoryId="DIC_kwDOLqQqXs4CbqQq"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
