import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import TagList from "./TagList";

const suggestion = {
  char: "#",
  items: ({ editor, query }) => {
    return new Promise((resolve) => {
      fetch(`/api/tags?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data.tags);
        });
    });
  },

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