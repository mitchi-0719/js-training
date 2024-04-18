import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md";

const convertData = (input) => {
  const convertedData = Array.from(
    new Set(input.map(({ species }) => species))
  );
  return convertedData.map((species) => {
    return {
      id: species,
      data: input
        .filter((v) => v.species === species)
        .map(({ sepalLength: x, petalWidth: y }) => ({ x, y })),
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer04"
      dataUrl="data/iris.json"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 04"
      Chart={Chart}
    />
  );
};

export default Lesson;
