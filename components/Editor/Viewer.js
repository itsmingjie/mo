/** Renders a read-only lightweight editor as "View" */

// Editor setup
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapTypography from "@tiptap/extension-typography";
import TiptapLowlight from "@tiptap/extension-code-block-lowlight";
import TMention from "@tiptap/extension-mention";

import { ViewerCodeblock } from "./Codeblock";
import TSuggestion from './Tagging/suggestion';

import lowlight from "lowlight";

const Viewer = ({ content }) => {
  const editor = useEditor({
    content: content || "",
    extensions: [
      StarterKit,
      TiptapLink,
      TiptapTypography,
      TiptapLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(ViewerCodeblock);
        },
      }).configure({ lowlight }),
      TMention.configure({
        HTMLAttributes: {
          class: 'tag',
        },
        suggestion: TSuggestion
      }),
    ],
    editable: false,
  });

  /** Note to self: Why is editor's class not a CSS module?
      It's very complicated to nest classes with CSS modules, but hljs classes
      require them to be under the <pre> tag. Styling for editor has been moved
      to global.scss. */
  return (
    <EditorContent editor={editor} className={"viewer rendered_content"} />
  );
};

module.exports = Viewer;
