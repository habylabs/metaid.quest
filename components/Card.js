import { useMediaQuery } from 'react-responsive'
import styles from '../styles/components/Card.module.css'

function Card({ children, tanBackground = false }) {
  const isMobile = useMediaQuery({ maxWidth: 480 })

  return (
    <div className={`${styles.cardContainer} ${tanBackground ? styles.cardTanBackground : styles.cardWhiteBackground}`}>
      <div className={isMobile ? 'side-padding-mobile' : 'side-padding'}>
        { children }
      </div>
    </div>
  )
}

export default Card