import { useMediaQuery } from 'react-responsive'
import styles from '../styles/components/Card.module.css'

const _getClasses = (darkBackground, noTopPadding) => {
  const background = darkBackground ? styles.cardDarkBackground : styles.cardTanBackground
  const topPadding = noTopPadding ? null : styles.cardContainerPaddingTop

  return `${styles.cardContainer} ${background} ${topPadding}`
}

const Card = ({ children, darkBackground = false, noTopPadding = false }) => {
  const isMobile = useMediaQuery({ maxWidth: 480 })

  return (
    <div className={_getClasses(darkBackground, noTopPadding)}>
      <div className={`column ${isMobile ? 'side-padding-mobile' : 'side-padding'}`}>
        { children }
      </div>
    </div>
  )
}

export default Card