import { ListOrdered, ListUnordered } from "@styled-icons/octicons";

// Editor setup
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapTypography from "@tiptap/extension-typography";
import TiptapLowlight from "@tiptap/extension-code-block-lowlight";
import Codeblock from "./Codeblock";

import lowlight from "lowlight";

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
    content: content || "",
    extensions: [
      StarterKit,
      TiptapLink,
      TiptapTypography,
      TiptapLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(Codeblock);
        },
      }).configure({ lowlight }),
    ],
    autofocus: true,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  // clear editor content and send data
  const clearAndSend = () => {
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
