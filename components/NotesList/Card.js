import styles from "./Card.module.scss";

const Card = ({time, content }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <div className={styles.card_header_time}>
          {/* formatted time */}
            {new Date(time).toLocaleString()}
        </div>
      </div>

      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

module.exports = Card;
