import styles from "./Card.module.scss";

import Viewer from "../Editor/Viewer";
import { KebabHorizontal } from "@styled-icons/octicons";

const Card = ({ time, content }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <div className={styles.card_header_time}>
          {/* formatted time */}
          {new Date(time).toLocaleString()}
        </div>
        <div>
          <button className={styles.card_menu_trigger}>
            <KebabHorizontal />
          </button>
        </div>
      </div>

      <div className={styles.card_content}>
        {/* what if... we render the content directly inside a stripped-down editor block? */}
        <Viewer content={content} />
      </div>
    </div>
  );
};

module.exports = Card;
