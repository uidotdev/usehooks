import { useState } from "react";
import Callout from "./Callout";
import HookCard from "./HookCard";
import HookSort from "./HookSort";
import styles from "./HooksList.module.css";

function insertAtIntervals(arr, items) {
  let newArr = [...arr]; // create a copy of the array
  let step = Math.ceil(newArr.length / items.length);

  // Insert the first item at the beginning of the array
  newArr.unshift(items[0]);

  for (let i = 1; i < items.length; i++) {
    let position = i * step + 1; // +1 to account for the first item
    newArr.splice(position, 0, items[i]);
  }

  return newArr;
}

function sortAlphabetical(a, b) {
  if (a.data.name < b.data.name) {
    return -1;
  }
  if (a.data.name > b.data.name) {
    return 1;
  }
  return 0;
}

function sortByPopularity(a, b) {
  if (a.data.rank < b.data.rank) {
    return -1;
  }
  if (a.data.rank > b.data.rank) {
    return 1;
  }
  return 0;
}

const sortMap = {
  name: sortAlphabetical,
  popular: sortByPopularity,
};

export default function HooksList({ hooks }) {
  const [sort, setSort] = useState<"name" | "popular">("popular");

  const list = hooks.sort(sortMap[sort]);
  const listWithCallouts = insertAtIntervals(list, [
    {
      id: "Callout 1",
      image: "d20",
      imageWidth: "222",
      imageHeight: "206",
      imageAlt: "20-sided die",
      pitch:
        "Don’t go it alone. Learn how to implement useHooks in your React projects.",
    },
    {
      id: "Callout 2",
      image: "money",
      imageWidth: "284",
      imageHeight: "180",
      imageAlt: "$100 Monopoly-style money",
      pitch:
        "Level up faster. Learn how to implement useHooks in your React projects.",
    },
    {
      id: "Callout 3",
      image: "spinner",
      imageWidth: "210",
      imageHeight: "210",
      imageAlt: "board game spinner and all options are React",
      pitch:
        "Want to learn how to build useHooks yourself? Check out react.gg – the interactive way to master modern React.",
    },
    {
      id: "Callout 4",
      image: "hot-sauce",
      imageWidth: "206",
      imageHeight: "224",
      imageAlt: "travel-style postcard from React that says “Enjoy the views!",
      pitch:
        "Check out 🔥 react.gg 🔥 – the interactive way to master modern React.",
    }
  ]);

  return (
    <section className={styles["hooks-grid"]}>
      <div className={styles["hooks-controls"]}>
        <HookSort setSort={setSort} value={sort} />
      </div>
      <ul className={styles["hooks-list"]}>
        {listWithCallouts.map(
          ({ data, id, image, imageWidth, imageHeight, imageAlt, pitch }) => {
            if (!data) {
              return (
                <Callout
                  key={id}
                  image={image}
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  imageAlt={imageAlt}
                  pitch={pitch}
                />
              );
            }
            return (
              <HookCard key={id} name={data.name} tagline={data.tagline} />
            );
          }
        )}
      </ul>
    </section>
  );
}
