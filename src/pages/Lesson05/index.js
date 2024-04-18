import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md";

const convertData = (input) => {
  const maxVal = Math.max(...input.map((v) => Math.round(v.y)));
  const minVal = Math.min(...input.map((v) => Math.round(v.y)));
  const classLength = Array.from({ length: maxVal - minVal + 1 }, (_, index) =>
    String(index + minVal)
  );
  return classLength.map((bin) => {
    return {
      bin: bin,
      男性: input.filter(
        (n) => String(Math.round(n.y)) === bin && n.gender === "男性"
      ).length,
      女性: input.filter(
        (n) => String(Math.round(n.y)) === bin && n.gender === "女性"
      ).length,
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer05"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 05"
      Chart={Chart}
    />
  );
};

export default Lesson;
