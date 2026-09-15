import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useT } from '../../context/LanguageContext';
import styles from './ScrollTopButton.module.scss';

const SHOW_AFTER_PX = 480;

export const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);
  const t = useT();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={classNames(styles.btn, { [styles.visible]: visible })}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('common.backToTop')}
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
        <path
          d="M4 9.5l4-4 4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
