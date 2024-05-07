import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart09";
import instruction from "./instruction.md";

const convertData = (input) => {
  const border = input.length * 0.01;
  const ministries = Array.from(new Set(input.map(({ ministry }) => ministry)));

  const bureaus = ministries.map((ministry) => {
    return {
      name: ministry,
      children: Array.from(
        new Set(
          input
            .filter(({ ministry: _ministry }) => _ministry === ministry)
            .map(({ bureau }) => bureau)
        )
      ),
    };
  });

  const allProjectData = bureaus.map((item) => {
    return {
      name: item.name,
      children: item.children
        .map((bureau) => {
          return {
            name: bureau,
            children: Array.from(
              new Set(
                input
                  .filter((_item) => _item.bureau === bureau)
                  .map(({ department }) => department)
              )
            )
              .map((v) => {
                let count = 0;
                input.map(({ ministry, bureau: _bureau, department }) => {
                  count +=
                    ministry === item.name &&
                    _bureau === bureau &&
                    department === v
                      ? 1
                      : 0;
                });
                return {
                  name: v,
                  count: count,
                };
              })
              .sort((a, b) => b.count - a.count),
          };
        })
        .sort(
          (a, b) =>
            b.children.reduce((acc, cur) => {
              return acc + cur.count;
            }, 0) -
            a.children.reduce((acc, cur) => {
              return acc + cur.count;
            }, 0)
        ),
    };
  });

  const convertedData = allProjectData.map(({ name, children }) => {
    const ministryObj = {
      name: name,
      children: children
        .filter(({ children }) => {
          return (
            children.reduce((acc, cur) => {
              return acc + cur.count;
            }, 0) >= border
          );
        })
        .map(({ name: _name, children: _children }) => {
          let otherCount = 0;
          const childrenObj = {
            name: _name,
            children: _children.filter(({ count }) => {
              if (count >= border) {
                return true;
              } else {
                otherCount += count;
                return false;
              }
            }),
          };
          childrenObj.children.push({ name: "その他", count: otherCount });
          return childrenObj;
        }),
    };

    const otherCount = children.reduce((acc, cur) => {
      const childrenSum = cur.children.reduce((acc, cur) => {
        return acc + cur.count;
      }, 0);
      if (childrenSum < border) {
        return acc + childrenSum;
      } else {
        return 0;
      }
    }, 0);

    if (otherCount !== 0) {
      ministryObj.children.push({
        name: "その他",
        count: otherCount,
      });
    }

    return ministryObj;
  });

  return {
    children: convertedData.sort((a, b) => {
      return (
        b.children.reduce((acc, cur) => {
          if (cur.children) {
            return (
              acc +
              cur.children.reduce((_acc, { count }) => {
                return _acc + count;
              }, 0)
            );
          } else {
            return acc + cur.count;
          }
        }, 0) -
        a.children.filter(Boolean).reduce((acc, cur) => {
          if (cur.children) {
            return (
              acc +
              cur.children.reduce((_acc, { count }) => {
                return _acc + count;
              }, 0)
            );
          } else {
            return acc + cur.count;
          }
        }, 0)
      );
    }),
  }; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer09"
      convertData={convertData}
      dataUrl="data/judgit-departments.json"
      instruction={instruction}
      title="Lesson 09"
      Chart={Chart}
    />
  );
};

export default Lesson;
