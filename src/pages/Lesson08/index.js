import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart08";
import instruction from "./instruction.md";

const convertData = (input) => {
  const tagsList = input.map(({ tags }) => {
    return tags;
  });

  const allLinks = tagsList
    .map((tags) => {
      return tags
        .map((tag, i) => {
          const _tags = tags.slice(i + 1);
          return _tags.map((_tag) => {
            return [tag, _tag];
          });
        })
        .flat();
    })
    .flat();

  const links = Array.from(
    new Set(
      allLinks
        .map((link) => {
          if (
            allLinks.filter(
              (_link) => JSON.stringify(link) === JSON.stringify(_link)
            ).length >= 2
          ) {
            const sort_link = link.sort();
            return { source: sort_link[0], target: sort_link[1] };
          }
        })
        .filter((v) => v !== undefined)
        .map(JSON.stringify)
    ),
    JSON.parse
  );

  const nodes = Array.from(new Set(links.flatMap((v) => Object.values(v)))).map(
    (v) => {
      return { id: v };
    }
  );

  return { nodes: nodes, links: links }; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer08"
      convertData={convertData}
      dataUrl="data/qiita-articles.json"
      instruction={instruction}
      title="Lesson 08"
      Chart={Chart}
    />
  );
};

export default Lesson;
