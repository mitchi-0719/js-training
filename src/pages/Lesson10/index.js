import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart10";
import instruction from "./instruction.md";

const convertData = (input) => {
  const maxFrequency = Math.max(
    ...input.nodes.map(({ frequency }) => frequency)
  );

  const removedNodes = input.nodes
    .map(({ id }) => {
      return {
        id: id,
        count: input.links.reduce((acc, { source, target }) => {
          return acc + (id === source || id === target ? 1 : 0);
        }, 0),
      };
    })
    .filter(({ count }) => count === 1)
    .map(({ id }) => id);

  const links = input.links.filter(
    ({ source, target }) =>
      !removedNodes.includes(source) && !removedNodes.includes(target)
  );

  const neighbors = {};
  for (const { id } of input.nodes.filter(
    ({ id }) => !removedNodes.includes(id)
  )) {
    neighbors[id] = [];
  }
  for (const { source, target } of links) {
    neighbors[source].push(target);
  }

  const attentionNode = "福島";
  const attentionNodes = new Set();
  const queue = [attentionNode];
  while (queue.length > 0) {
    const u = queue.shift();
    if (attentionNodes.has(u)) {
      continue;
    }
    attentionNodes.add(u);
    for (const v of neighbors[u]) {
      queue.push(v);
    }
  }

  const nodes = input.nodes
    .filter(({ id }) => !removedNodes.includes(id))
    .map(({ frequency, id }) => {
      return {
        frequency: frequency,
        id: id,
        radius: 20 * Math.sqrt(frequency / maxFrequency),
        color: attentionNodes.has(id) ? "red" : "blue",
      };
    });

  return { nodes: nodes, links: links }; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer10"
      convertData={convertData}
      dataUrl="data/topic-graph.json"
      instruction={instruction}
      title="Lesson 10"
      Chart={Chart}
    />
  );
};

export default Lesson;
