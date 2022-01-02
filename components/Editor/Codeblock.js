import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styles from "./Codeblock.module.scss";

/** a stripped down version with only single language support */
const ViewerCodeblock = ({
  node: {
    attrs: { language: defaultLanguage },
  }
}) => (
  <NodeViewWrapper className={styles.code_block}>
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      disabled
    >
      <option value={defaultLanguage}>{defaultLanguage}</option>
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);


const EditorCodeblock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension
}) => (
  <NodeViewWrapper className={styles.code_block}>
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={(event) => updateAttributes({ language: event.target.value })}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

module.exports = { EditorCodeblock, ViewerCodeblock };
