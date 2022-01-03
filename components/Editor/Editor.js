import { ListOrdered, ListUnordered } from "@styled-icons/octicons";
import lowlight from "lowlight";

// Editor setup
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TLink from "@tiptap/extension-link";
import TTypography from "@tiptap/extension-typography";
import TLowlight from "@tiptap/extension-code-block-lowlight";
import TMention from "@tiptap/extension-mention";

import { EditorCodeblock } from "./Codeblock";
import TSuggestion from './Tagging/suggestion';

import styles from "./Editor.module.scss";

const MenuBar = ({ editor, sendHandler }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editor_menu}>
      <div className={styles.editor_menu_left}>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            (editor.isActive("orderedList") ? "is-active" : "") +
            " " +
            styles.editor_menu_button
          }
        >
          <ListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            (editor.isActive("bulletList") ? "is-active" : "") +
            " " +
            styles.editor_menu_button
          }
        >
          <ListUnordered />
        </button>
      </div>
      <div className={styles.editor_menu_right}>
        <button className={styles.submit_button} onClick={sendHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

const Editor = ({ content, setContent, sendHandler }) => {
  const editor = useEditor({
    content: content || null,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
      }),
      TLink,
      TTypography,
      TLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(EditorCodeblock);
        },
      }).configure({
        HTMLAttributes: {
          className: "test",
        },
        lowlight,
      }),
      TMention.configure({
        HTMLAttributes: {
          class: 'tag',
        },
        suggestion: TSuggestion,
      }),
    ],
    autofocus: true,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  // clear editor content and send data
  const clearAndSend = () => {
    // TODO: disable send button and set loading state on click
    editor.commands.setContent("");
    sendHandler();
  };

  return (
    <div className={styles.editor_wrapper}>
      {/** Note to self: Why is editor's class not a CSS module?
         It's very complicated to nest classes with CSS modules, but hljs classes
         require them to be under the <pre> tag. Styling for editor has been moved
         to global.scss. */}
      <EditorContent editor={editor} className={"editor rendered_content"} />
      <MenuBar editor={editor} sendHandler={clearAndSend} />
    </div>
  );
};

module.exports = Editor;
