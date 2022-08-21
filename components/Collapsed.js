import { useMediaQuery } from 'react-responsive'
import useCollapse from 'react-collapsed'
import { ActionIcon } from '@mantine/core';
import { IconArrowRight, IconArrowDown } from '@tabler/icons';

import styles from '../styles/components/Collapsed.module.css'

const Collapsed = ({ titleText, children, darkBackground = false }) => {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const sidePadding = isMobile ? 'side-padding-mobile' : 'side-padding'

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  return (
    <div className={`column ${styles.collapsedContainer}`}>
      <div className={`row align-center ${isExpanded ? styles.collapsedHeaderPadding : null} ${sidePadding}`}>
        <h2 className={`no-margin monospace-font ${styles.collapsedHeaderText}`}>
          {titleText}
        </h2>
        <ActionIcon variant='transparent' {...getToggleProps()}>
          {
            isExpanded ?
            <IconArrowDown color={darkBackground ? '#FDF6E3' : '#191100'} /> :
            <IconArrowRight color={darkBackground ? '#FDF6E3' : '#191100'} />
          }
        </ActionIcon>
      </div>
      <section {...getCollapseProps()} className={sidePadding}>
        {children}
      </section>
    </div>
  )
}

export default Collapsed