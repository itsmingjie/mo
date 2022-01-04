import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import TagList from "./TagList";

// uh oh, say hello to frequent dependabot warnings for lodash
import debounce from "debounce-promise";

const SUGGESTION_CACHE = {};

const getItems = ({ editor, query }) => {
  const appendQuery = (query, items) => {
    return query !== "" && items.includes(query) ? items : [...items, query];
  };

  const fetchSuggestions = (query) => {
    return new Promise((resolve) => {
      fetch(`/api/tags?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          // store into local cache
          const processedTags = appendQuery(query, data.tags);

          SUGGESTION_CACHE[query] = {
            tags: processedTags,
            timestamp: Date.now(),
          };

          resolve(processedTags);
        });
    });
  };
  const debounceSuggestions = debounce(fetchSuggestions, 500);

  if (SUGGESTION_CACHE[query]) {
    // reduce to local cache if it has been less than a minute since the timestamp of the cache
    const { timestamp, tags } = SUGGESTION_CACHE[query];
    if (timestamp + 60 * 1000 > Date.now()) {
      return tags;
    }
  }

  // fallback to fetching from the server
  return new Promise((resolve) => {
    debounceSuggestions(query).then((tags) => {
      resolve(tags);
    });
  });
};

const suggestion = {
  char: "#",
  items: getItems,

  render: () => {
    let component;
    let popup;

    return {
      onStart: (props) => {
        component = new ReactRenderer(TagList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component && component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

module.exports = suggestion;
