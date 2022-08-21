import { useMediaQuery } from 'react-responsive'
import styles from '../styles/components/Card.module.css'

const _getClasses = (darkBackground, noHeightPadding) => {
  const background = darkBackground ? styles.cardDarkBackground : styles.cardTanBackground
  const topPadding = noHeightPadding ? null : styles.cardContainerPadding

  return `${styles.cardContainer} ${background} ${topPadding}`
}

const Card = ({
  children,
  darkBackground = false,
  noHeightPadding = false,
  noWidthPadding = false,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const sidePadding = noWidthPadding ? null : isMobile ? 'side-padding-mobile' : 'side-padding'

  return (
    <div className={_getClasses(darkBackground, noHeightPadding)}>
      <div className={`column ${sidePadding}`}>
        { children }
      </div>
    </div>
  )
}

export default Card