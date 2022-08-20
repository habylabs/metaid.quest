import { useMediaQuery } from 'react-responsive'
import styles from '../styles/components/Card.module.css'

const _getClasses = (tanBackground, noTopPadding) => {
  const background = tanBackground ? styles.cardTanBackground : styles.cardWhiteBackground
  const topPadding = noTopPadding ? null : styles.cardContainerPaddingTop

  return `${styles.cardContainer} ${background} ${topPadding}`
}

const Card = ({ children, tanBackground = false, noTopPadding }) => {
  const isMobile = useMediaQuery({ maxWidth: 480 })

  return (
    <div className={_getClasses(tanBackground, noTopPadding)}>
      <div className={`column ${isMobile ? 'side-padding-mobile' : 'side-padding'}`}>
        { children }
      </div>
    </div>
  )
}

export default Card