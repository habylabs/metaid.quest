import styles from '../styles/components/Loading.module.css';

const Loading = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.spinner} />
  </div>
)

export default Loading