import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart06";
import instruction from "./instruction.md";

const convertData = (input) => {
  return input.map((v) => {
    return {
      color: v.gender === "男性" ? "blue" : "red",
      gender: v.gender,
      bmi: v.x / Math.pow(v.y / 100, 2),
      weight: v.x,
      height: v.y,
    };
  });
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer06"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 06"
      Chart={Chart}
    />
  );
};

export default Lesson;
