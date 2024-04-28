import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md";

const convertData = (input) => {
  const utcToJst = (d) => {
    const utcDate = new Date(d);
    const diff = 9 * 60 * 60 * 1000;
    const jstDate = new Date(utcDate.getTime() + diff);
    return jstDate.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replaceAll("/", "-");
  };

  const date = Array.from(
    new Set(
      input.map(({ createdAt }) => {
        return utcToJst(createdAt);
      })
    )
  );
  return [
    {
      id: "tweet",
      data: date.map((d) => {
        return {
          x: d,
          y: input.filter(
            ({ createdAt, isRetweet }) =>
              utcToJst(createdAt) === d && !isRetweet
          ).length,
        };
      }),
    },
    {
      id: "reTweet",
      data: date.map((d) => {
        return {
          x: d,
          y: input.filter(
            ({ createdAt, isRetweet }) => utcToJst(createdAt) === d && isRetweet
          ).length,
        };
      }),
    },
  ];
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
